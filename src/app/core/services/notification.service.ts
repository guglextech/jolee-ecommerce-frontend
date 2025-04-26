import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();
  private notificationCount = 0;

  constructor() { }

  private addNotification(notification: Notification): string {
    const id = notification.id || `notification-${this.notificationCount++}`;
    const newNotification: Notification = {
      ...notification,
      id
    };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, newNotification]);

    // Auto remove after duration if specified
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        this.removeNotification(id);
      }, notification.duration);
    }

    return id;
  }

  removeNotification(id: string): void {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = currentNotifications.filter(
      notification => notification.id !== id
    );

    this.notificationsSubject.next(updatedNotifications);
  }

  clearAll(): void {
    this.notificationsSubject.next([]);
  }

  success(message: string, duration = 5000): string {
    return this.addNotification({
      id: '',
      type: 'success',
      message,
      duration
    });
  }

  error(message: string, duration = 8000): string {
    return this.addNotification({
      id: '',
      type: 'error',
      message,
      duration
    });
  }

  warning(message: string, duration = 6000): string {
    return this.addNotification({
      id: '',
      type: 'warning',
      message,
      duration
    });
  }

  info(message: string, duration = 5000): string {
    return this.addNotification({
      id: '',
      type: 'info',
      message,
      duration
    });
  }

  custom(notification: Notification): string {
    return this.addNotification(notification);
  }
}