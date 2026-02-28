import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule, RouterLink],
    template: `
    <div class="row justify-content-center my-5">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-body p-5">
            <h2 class="fw-bold text-center mb-4">Sign Up</h2>
            @if (message) {
              <div class="alert alert-danger" role="alert">
                {{ message }}
              </div>
            }
            <form (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <label for="name" class="form-label fw-bold">Name</label>
                <input type="text" class="form-control p-3 bg-light border-0 rounded-3" id="name" [(ngModel)]="name" name="name" placeholder="Enter name" required>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label fw-bold">Email Address</label>
                <input type="email" class="form-control p-3 bg-light border-0 rounded-3" id="email" [(ngModel)]="email" name="email" placeholder="Enter email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label fw-bold">Password</label>
                <input type="password" class="form-control p-3 bg-light border-0 rounded-3" id="password" [(ngModel)]="password" name="password" placeholder="Enter password" required>
              </div>
              <div class="mb-4">
                <label for="confirmPassword" class="form-label fw-bold">Confirm Password</label>
                <input type="password" class="form-control p-3 bg-light border-0 rounded-3" id="confirmPassword" [(ngModel)]="confirmPassword" name="confirmPassword" placeholder="Confirm password" required>
              </div>
              <button type="submit" class="btn btn-primary w-100 rounded-pill p-3 fw-bold mb-3 shadow-sm" [disabled]="loading">
                @if (loading) {
                  <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                }
                Register
              </button>
            </form>
            <div class="text-center mt-3">
              Have an Account? <a [routerLink]="['/login']" [queryParams]="{ returnUrl: returnUrl }" class="text-decoration-none fw-bold">Login here</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
    authService = inject(AuthService);
    router = inject(Router);
    route = inject(ActivatedRoute);

    name = '';
    email = '';
    password = '';
    confirmPassword = '';
    message = '';
    loading = false;
    returnUrl = '/';

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        if (this.authService.currentUser()) {
            this.router.navigate([this.returnUrl]);
        }
    }

    onSubmit() {
        if (this.password !== this.confirmPassword) {
            this.message = 'Passwords do not match';
            return;
        }

        this.loading = true;
        this.message = '';

        this.authService.register(this.name, this.email, this.password).subscribe({
            next: () => {
                this.router.navigateByUrl(this.returnUrl);
            },
            error: (err) => {
                this.message = err.error?.message || 'Registration failed';
                this.loading = false;
            }
        });
    }
}
