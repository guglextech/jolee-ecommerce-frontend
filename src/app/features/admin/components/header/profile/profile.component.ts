import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FeatherIconComponent } from '../../sharedComponents/feather-icon/feather-icon.component';
import { profile } from '../../../data/header';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, FeatherIconComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  // public profile = profile;

  constructor(private authService: AuthService) {}

  logOut() {
    this.authService.logout();
  }
}
