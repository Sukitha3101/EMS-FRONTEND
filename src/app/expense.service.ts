import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Expense {
  expenseID: number;
  userID: string;
  amount: string;
  date: string;
  categoryID: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://localhost:6060';

  constructor(private http: HttpClient) { }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/expenses`);
  }

  createExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.apiUrl}/expenses`, expense);
  }

  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/expenses/${expense.expenseID}`, expense);
  }

  deleteExpense(expenseID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/expenses/${expenseID}`);
  }

  getCategoryDropdownOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }
  getUserDropdownOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/auth`);
  }
}
