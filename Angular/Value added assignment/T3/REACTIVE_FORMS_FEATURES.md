# Reactive Forms Features Used

In this Event Management system, several advanced Reactive Forms features were leveraged to build a dynamic, secure, and reactive registration UI:

1. **FormBuilder & FormGroups:** Used `this.fb.group()` to quickly construct a complex form architecture containing standard controls, nested groups, and arrays.
2. **Dynamic FormArrays:** Utilized `FormArray` to dynamically push and remove new `FormGroup` controls for attendee details (Name, Email, Phone) based on the user's numeric input for the number of attendees.
3. **Synchronous Validations:** Applied standard Angular validators (`Validators.required`, `Validators.email`, `Validators.min`, `Validators.max`) to enforce basic data integrity. 
4. **Dynamic Validators:** Applied `Validators.max()` dynamically based on the specific event's available seat capacity to prevent overbooking on a per-event basis.
5. **Custom Validators:** Implemented standalone static methods (`CustomValidators.phoneNumber` and `CustomValidators.couponCode`) to validate strict regex patterns and verify data against an accepted array of coupon codes.
6. **Reactive valueChanges:** Subscribed to `this.registerForm.valueChanges` and `this.registerForm.get('numAttendees').valueChanges` to push real-time form updates to Angular Signals, gracefully bridging RxJS and Signals to power the dynamic UI and real-time pricing calculator.