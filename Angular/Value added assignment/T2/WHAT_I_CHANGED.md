Here is the technical breakdown of what was broken in the original codebase and the specific code changes made to fix each of the 7 bugs:

**Bug 1 & Bug 2: Post Details & Comments Not Loading**
* **Original Issue:** In `post-detail.component.ts`, the route parameter `const postId = this.route.snapshot.params['postId'];` extracted the ID as a `string`. Because the mock data uses `number` types for IDs, the strict equality checks (`===`) in the service failed to find any matches, resulting in blank data.
* **Code Change:** Wrapped the parameter in a `Number()` constructor: `const postId = Number(this.route.snapshot.params['postId']);`. This ensured the ID types matched perfectly, allowing the post content and comments to correctly load.

**Bug 3: Form Validation Errors Not Displaying**
* **Original Issue:** In `post-detail.component.html`, the submit button had the attribute `[disabled]="commentForm.invalid"`. This prevented users from clicking the button when the form was empty or invalid, meaning the `submitComment()` method never fired. Without that method firing, `markAsTouched()` was never called on the form controls, so the red error text remained hidden.
* **Code Change:** Removed `[disabled]="commentForm.invalid"` from the `<button type="submit">`. This allows the button to be clicked, triggering the validation logic and displaying the native UI error messages.

**Bug 4: Comment Count Fails to Update**
* **Original Issue:** In `post-detail.component.ts`, the `commentCount` was a `computed()` signal tracking `this.comments.length`. However, `this.comments` was originally defined as a standard array (`comments: Comment[] = [];`). Pushing new items to a standard array does not trigger Angular's signal reactivity.
* **Code Change:** Converted the comments array into a signal: `comments = signal<Comment[]>([]);`. Updated the HTML to iterate over `comments()`, and in the `submitComment` method, used `this.comments.update(curr => [...curr, comment]);` to properly trigger the reactive UI update.

**Bug 5: Unauthorized Edit/Delete Buttons Visible**
* **Original Issue:** The `isAuthor` check in `auth.service.ts` was not safely handling null values if a user wasn't logged in, and suffered from type-matching issues between strings and numbers.
* **Code Change:** Updated `isAuthor()` to explicitly extract the user signal, return `false` if it is null, and enforce a strict numeric comparison: `return Number(user.id) === Number(postAuthorId);`.

**Bug 6: Memory Leaks Slowing Down the App**
* **Original Issue:** Components were subscribing to Observables (like `getPosts()` and `getPostById()`) but never unsubscribing when the user navigated away. This created duplicate background subscriptions in memory every time the user switched pages.
* **Code Change:** Implemented the `OnDestroy` lifecycle hook in both `PostListComponent` and `PostDetailComponent`. Created a `private destroy$ = new Subject<void>()` and added `.pipe(takeUntil(this.destroy$))` to every HTTP subscription to ensure they are properly destroyed when the component unmounts.

**Bug 7: No On-Screen Errors for Backend Failures**
* **Original Issue:** While the HTML templates had `@if (error)` blocks prepared, the component logic wasn't reliably surfacing the error states to the UI during failures. 
* **Code Change:** Ensured that in the `error` callback of every subscription, `this.error` (in the list component) and `this.error.set()` (in the detail component) are populated with user-friendly strings so the Bootstrap alert banners successfully render on the screen.