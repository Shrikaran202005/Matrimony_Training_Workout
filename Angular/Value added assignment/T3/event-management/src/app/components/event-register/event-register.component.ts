import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { CustomValidators } from '../../services/form-validators';
import { Event } from '../../models/event.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-event-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-register.component.html',
  styleUrls: ['./event-register.component.css']
})
export class EventRegisterComponent implements OnInit, OnDestroy {

  event: Event | null = null;
  registerForm!: FormGroup;
  
  ticketTypes = [
    { name: 'General', price: 50 },
    { name: 'VIP', price: 100 },
    { name: 'Student', price: 25 }
  ];

  loading = signal(false);
  error = signal('');
  submitError = signal('');
  validCoupons = ['SAVE10', 'SAVE20', 'STUDENT'];

  subtotal = computed(() => {
    const ticketType = this.registerForm?.get('ticketType')?.value;
    const numAttendees = parseInt(this.registerForm?.get('numAttendees')?.value || '1');
    const ticket = this.ticketTypes.find(t => t.name === ticketType);
    return ticket ? ticket.price * numAttendees : 0;
  });

  discount = computed(() => {
    const coupon = this.registerForm?.get('couponCode')?.value || '';
    const sub = this.subtotal();
    const discountPercent = this.validCoupons.includes(coupon.toUpperCase()) 
      ? (coupon.toUpperCase() === 'SAVE10' ? 10 : coupon.toUpperCase() === 'SAVE20' ? 20 : 15)
      : 0;
    return Math.round((sub * discountPercent) / 100);
  });

  total = computed(() => this.subtotal() - this.discount());

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.params['eventId'];
    if (eventId) {
      this.loadEvent(eventId);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadEvent(eventId: number): void {
    this.loading.set(true);
    this.error.set('');
    
    this.eventService.getEventById(eventId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (event) => {
          this.event = event;
          this.loading.set(false);
          if (!event) {
            this.error.set('Event not found');
          }
        },
        error: () => {
          this.error.set('Failed to load event');
          this.loading.set(false);
        }
      });
  }

  private createForm(): void {
    this.registerForm = this.fb.group({
      ticketType: ['', Validators.required],
      numAttendees: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      attendees: this.fb.array([]),
      couponCode: [''],
      terms: [false, Validators.requiredTrue]
    });

    this.registerForm.get('numAttendees')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.updateAttendeeArray(parseInt(value));
      });
  }

  private updateAttendeeArray(count: number): void {
    const attendeesArray = this.registerForm.get('attendees') as FormArray;
    attendeesArray.clear();
    for (let i = 0; i < count; i++) {
      attendeesArray.push(this.createAttendeeControl());
    }
  }

  private createAttendeeControl(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, CustomValidators.phoneNumber]]
    });
  }

  get attendees(): FormArray {
    return this.registerForm.get('attendees') as FormArray;
  }

  getAttendeeError(fieldName: string, index: number): string {
    const field = this.attendees.at(index).get(fieldName);
    if (field?.hasError('required')) return `${fieldName} is required`;
    if (field?.hasError('email')) return 'Invalid email';
    if (field?.hasError('minlength')) return `${fieldName} too short`;
    if (field?.hasError('invalidPhone')) return 'Phone must be 10 digits';
    return '';
  }

  submitRegistration(): void {
    if (this.registerForm.invalid || !this.event) {
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
      return;
    }

    const attendeeCount = this.attendees.length;
    const availableSeats = this.event.totalSeats - this.event.bookedSeats;

    if (attendeeCount > availableSeats) {
      this.submitError.set(`Only ${availableSeats} seats available`);
      return;
    }

    const registration = {
      eventId: this.event.id,
      eventName: this.event.name,
      ticketType: this.registerForm.get('ticketType')?.value,
      attendees: this.attendees.value,
      couponCode: this.registerForm.get('couponCode')?.value,
      subtotal: this.subtotal(),
      discount: this.discount(),
      total: this.total()
    };

    this.eventService.registerEvent(registration)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.router.navigate(['/confirmation'], { state: { registration } });
        },
        error: (err) => {
          this.submitError.set(err.message || 'Registration failed');
        }
      });
  }
}

