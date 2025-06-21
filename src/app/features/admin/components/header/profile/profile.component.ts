import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FeatherIconComponent } from '../../sharedComponents/feather-icon/feather-icon.component';
import { profile } from '../../../data/header';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, FeatherIconComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  public profile = profile;

  constructor(private router: Router) {}

  logOut() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
