import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: any) {
    this.userSubject.next(user.body);
  }

  getUser() {
    return this.userSubject.value;
  }
}
