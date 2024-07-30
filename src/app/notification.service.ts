import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Notification {
  notificationID: number;
  message: string;
  status: 'READ' | 'UNREAD';
  date: string;
  user: {
    userID: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:6060'; 

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/notifications`);
  }

  createNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${this.apiUrl}/notifications`, notification);
  }

  deleteNotification(notificationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/notifications/${notificationId}`);
  }
  
  deleteAllNotifications(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/notifications`);
  }
  
  updateNotification(notification: Notification): Observable<Notification> {
    return this.http.put<Notification>(`${this.apiUrl}/notifications/${notification.notificationID}`, notification);
  }
}
