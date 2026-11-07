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

  // FIX Bugs 6 & 7: Bridge the Reactive Form to Angular Signals so computed() works!
  formValues = signal<any>({});
  
  subtotal = computed(() => {
    const values = this.formValues();
    const ticketType = values?.ticketType;
    const numAttendees = parseInt(values?.numAttendees || '1');
    const ticket = this.ticketTypes.find(t => t.name === ticketType);
    
    // FIXED syntax error: added the * operator
    return ticket ? ticket.price * numAttendees : 0;
  });

  discount = computed(() => {
    const values = this.formValues();
    const coupon = values?.couponCode || '';
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
    // FIX Bug 3: Parse ID to a Number so the strict route matching works
    const eventId = Number(this.route.snapshot.params['eventId']);
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
          } else {
            // FIX Bug 8: Dynamically clamp max attendees to the available capacity
            const available = event.totalSeats - event.bookedSeats;
            this.registerForm.get('numAttendees')?.setValidators([Validators.required, Validators.min(1), Validators.max(Math.min(10, available))]);
            this.registerForm.get('numAttendees')?.updateValueAndValidity();
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
      // FIX Bug 9: Add the custom coupon validator to the field
      couponCode: ['', [CustomValidators.couponCode(this.validCoupons)]],
      terms: [false, Validators.requiredTrue]
    });

    // FIX Bug 5: Initialize the form array immediately so the first attendee fields appear
    this.updateAttendeeArray(1);
    this.formValues.set(this.registerForm.value);

    // Keep form array synced without destroying existing valid inputs
    this.registerForm.get('numAttendees')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.updateAttendeeArray(parseInt(value) || 1);
      });

    // Bridge Reactive Form changes to the Signal for real-time price calculations
    this.registerForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.formValues.set(value);
      });
  }

  private updateAttendeeArray(count: number): void {
    const attendeesArray = this.registerForm.get('attendees') as FormArray;
    const currentLength = attendeesArray.length;
    
    if (count > currentLength) {
      for (let i = currentLength; i < count; i++) {
        attendeesArray.push(this.createAttendeeControl());
      }
    } else {
      for (let i = currentLength - 1; i >= count; i--) {
        attendeesArray.removeAt(i);
      }
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

  // ADD THIS HELPER METHOD:
  getAttendeeFormGroup(index: number): FormGroup {
    return this.attendees.at(index) as FormGroup;
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
    
    // FIXED syntax error: added the - operator
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
          // Navigating to root / as per earlier configurations, adjust if needed
          this.router.navigate(['/'], { state: { registration } });
        },
        error: (err) => {
          this.submitError.set(err.message || 'Registration failed');
        }
      });
  }
}