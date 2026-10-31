import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  
  static phoneNumber(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(control.value) ? null : { invalidPhone: true };
  }

  static couponCode(validCoupons: string[]): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      return validCoupons.includes(control.value.toUpperCase()) ? null : { invalidCoupon: true };
    };
  }
}