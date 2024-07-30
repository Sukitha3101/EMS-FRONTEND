import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Report {
  reportID: number;
  user: User;
  period: string;
  totalAmount: number;
  generatedDate: string;
}

interface Expense {
  expenseID: number;
  amount: number;
  date: string;
  description: string;
  userID: number;
  categoryID: number;
}

interface User {
  userID: number;
  name: string;
  email: string;
  role: string;
  password: string;
  expenses: Expense[];
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:6060';

  constructor(private http: HttpClient) { }

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/reports`);
  }

  createReport(report: Report): Observable<Report> {
    return this.http.post<Report>(`${this.apiUrl}/reports`, report);
  }

  deleteReport(index: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/reports/${index}`);
  }

  getDropdownOptions(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user/auth`);
  }

  generateReport(criteria: any): Observable<Expense[]> {
    return this.http.post<Expense[]>(`${this.apiUrl}/reports/generate`, criteria);
  }
}
