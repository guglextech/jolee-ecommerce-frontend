import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public show: boolean = false;
  public loginForm: FormGroup;
  public validate: boolean = false;
  public isLoading: boolean = false;

  public loginType: string = 'login';
  private marketAuth: boolean = false;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    if (state) {
      this.marketAuth = state.marketAuth || false;
      console.log({ status: state });
      this.loginType = state.status || 'login';
    }

    const userDetails = localStorage.getItem('user');
    if (userDetails?.email) {
      if (this.marketAuth) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/dashboard/home']);
      }
    }
  }

  ngOnInit(): void {}

  showPassword() {
    this.show = !this.show;
  }

  login() {
    this.validate = true;
    this.isLoading = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response && response.token) {
            this.isLoading = false;
            this.authService.setProperty('isAuthenticated', true);
            // Store token or user data as needed
            console.log('Login successful', response);
            this.localStorage.setItem('token', response.token);
            this.localStorage.setItem('shipping', response.shippingAddress);
            this.localStorage.setItem('user', response.user);
            this.authService.setProperty('user', response.user);
            if (this.marketAuth) {
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/dashboard/home']);
            }
          }
        },
        error: (error) => {
          console.error('Login failed', error);
          this.authService.setProperty('isAuthenticated', false);
          this.isLoading = false;
          this.toast.error(
            'Login failed. Please check your credentials.',
            'Error',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
        },
      });
    }
  }

  updateLoginType(type: string) {
    this.loginType = type;
  }
}
