import { Component } from '@angular/core';
import { recentActivity } from 'src/app/features/admin/data/e-commerce';

@Component({
  selector: 'app-recent-activity',
  standalone: true,
  imports: [],
  templateUrl: './recent-activity.component.html',
  styleUrl: './recent-activity.component.scss',
})
export class RecentActivityComponent {
  public recentActivity = recentActivity;
}
