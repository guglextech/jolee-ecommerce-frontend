import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-notification-container',
  template: `
    <div class="notification-container">
      <app-toast-notification
        *ngFor="let notification of notifications"
        [type]="notification.type"
        [message]="notification.message"
        [duration]="notification.duration || 5000"
        (close)="onCloseNotification(notification.id)">
      </app-toast-notification>
    </div>
  `,
  styles: [`
    .notification-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      pointer-events: none;
      
      app-toast-notification {
        pointer-events: auto;
        margin-bottom: 10px;
      }
      
      @media (max-width: 576px) {
        max-width: calc(100vw - 40px);
        top: 10px;
        right: 10px;
      }
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class NotificationContainerComponent implements OnInit {
  notifications: Notification[] = [];
  
  constructor(private notificationService: NotificationService) {}
  
  ngOnInit(): void {
    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
    });
  }
  
  onCloseNotification(id: string): void {
    this.notificationService.removeNotification(id);
  }
}