# Event Management - Test Results

All 10 bugs have been successfully fixed and verified against the core scenarios:

* **Bug 1 (Events List Not Loading):** Fixed the asynchronous race condition by managing the loading state properly, ensuring all events display on the home page without the empty state flickering.
* **Bug 2 (Search and Filter Not Working):** Shifted filtering logic to the client side so searching by name, category, and price range works accurately and simultaneously.
* **Bug 3 (Registration Form Doesn't Load):** Converted the string `eventId` route parameter to a `Number` to ensure strict ID matching in the service.
* **Bug 4 (Form Validation Not Working):** Removed the `[disabled]` attribute on the submit button. Now, clicking submit on an invalid form triggers native error messages.
* **Bug 5 (Dynamic Attendee Fields):** Properly initialized and cleared the `FormArray` based on the `numAttendees` selection so the dynamic attendee detail fields instantly appear.
* **Bug 6 (Price Calculation Wrong):** Created a `formValues` Signal bridged to the reactive form's `valueChanges` observable to ensure the subtotal calculates accurately in real-time.
* **Bug 7 (Coupon Code Not Applying):** The discount signal now successfully parses the active form values and applies the exact percentage to the subtotal.
* **Bug 8 (Capacity Not Checked):** Added a dynamic `Validators.max()` to the attendees field based on real-time available seats (Total Seats - Booked Seats) to strictly prevent overbooking. Updated the HTML to display the exact dynamic maximum.
* **Bug 9 (Coupon Validator):** Attached the custom `couponCode` validator directly to the field to reject invalid codes and display an error message.
* **Bug 10 (Terms Checkbox):** The submit action now checks for invalid forms (which includes the `Validators.requiredTrue` on the terms checkbox), and the HTML ensures the error only displays if touched and invalid.