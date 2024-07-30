import { Component, HostListener, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { UserService } from '../user.service';

interface Notification {
  notificationID: number;
  message: string;
  status: 'READ' | 'UNREAD';
  date: string;
  user: {
    userID: number;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentComponent: string = 'expenses';
  showModal: boolean = false;
  user: any;

  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe(data => {
      if (this.user.role == 'USER'){
        this.notifications = data.filter(n => n.user.userID === this.user.uid);
      }else{
        this.notifications = data;
      }
    });
  }

  showComponent(component: string): void {
    this.currentComponent = component;
  }

  openNotificationModal(event: MouseEvent): void {
    event.stopPropagation();
    this.showModal = true;
  }

  closeNotificationModal(): void {
    this.showModal = false;
  }

  formatDate(date: string | null): string {
    if (!date) {
      return '--'; 
    }
    const d = new Date(date);  
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  toggleReadStatus(notification: Notification): void {
    notification.status = notification.status === 'READ' ? 'UNREAD' : 'READ';
    const finalUpdatedNotification: any = {
      notificationID: notification.notificationID,
      user: notification.user.userID,  
      date: notification.date,     
      message: notification.message,  
      status: notification.status
    }
    this.notificationService.updateNotification(finalUpdatedNotification).subscribe(updatedNotification => {
      this.loadNotifications();
    });
  }

  clearAllNotifications(): void {
    this.notificationService.deleteAllNotifications().subscribe(() => {
      this.notifications = [];
    });
  }

  deleteNotification(notification: Notification): void {
    this.notificationService.deleteNotification(notification.notificationID).subscribe(() => {
      this.notifications = this.notifications.filter(n => n.notificationID !== notification.notificationID);
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.showModal && !(event.target as HTMLElement).closest('.notification-modal')) {
      this.closeNotificationModal();
    }
  }

  navigateToUrl(){
    this.currentComponent = "expenses";
  }
}
