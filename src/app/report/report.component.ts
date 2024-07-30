import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportService } from '../report.service';
import { UserService } from '../user.service';
import { NotificationService } from '../notification.service';
import { HomeComponent } from '../home/home.component';

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

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportForm: FormGroup;
  reports: Report[] = [];
  expenses: Expense[] = [];
  userDropdownOptions: User[] = [];
  totalAmountCalc: number = 0;
  user: any;


  constructor(private fb: FormBuilder, private reportService: ReportService,
    private userService: UserService, private notificationService: NotificationService, private homeComponent: HomeComponent

  ) {
    this.reportForm = this.fb.group({
      user: [''],
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserDropdownOptions();
    this.loadReports();
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  loadUserDropdownOptions(): void {
    this.reportService.getDropdownOptions().subscribe(options => {
      if (this.user.role == 'USER'){
        this.userDropdownOptions = options.filter(o => o.userID === this.user.uid);
      }else{
        this.userDropdownOptions = options;
      }
    });
  }

  loadReports(): void {
    this.reportService.getReports().subscribe(data => {
      if (this.user.role == 'USER'){
        this.reports = data.filter(r => r.user.userID === this.user.uid);
      }else{
        this.reports = data;
      }
    });
  }

  getUserName(userID: number): string {
    const user = this.userDropdownOptions.find(option => option.userID == userID);
    return user ? user.name : 'Unknown';
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

  onSubmit(): void {
    const reportCriteria = {
        ...this.reportForm.value,
        startDate: `${this.reportForm.value.startDate}T00:00:00Z`,
        endDate: `${this.reportForm.value.endDate}T00:00:00Z`
    };

    this.reportService.generateReport(reportCriteria).subscribe(expenses => {
        this.expenses = expenses;
        this.totalAmountCalc = this.calculateTotalAmount(this.expenses);

        const startDate = new Date(this.reportForm.value.startDate);
        const endDate = new Date(this.reportForm.value.endDate);

        const period = this.calculatePeriod(startDate, endDate);

        const newReport: any = {
            user: this.reportForm.value.user,  
            period: period,  
            totalAmount: this.totalAmountCalc,     
            generatedDate: new Date().toISOString() 
        };
        

        this.reportService.createReport(newReport).subscribe(report => {
          this.loadReports();
          this.reportForm.reset();
        });
        this.loadUserDropdownOptions();
        console.log(newReport);
        const newNotification: any = {
          user: this.user.uid,
          status: 'UNREAD',
          date: new Date().toISOString(),
          message: `New Report for (${this.getUserName(newReport.user)}) created`,
        };
        this.notificationService.createNotification(newNotification).subscribe(notification => {
          this.homeComponent.loadNotifications();
        });
    });
}

calculatePeriod(startDate: Date, endDate: Date): string {
    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();
    const days = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    let period = '';
    if (years > 0) {
        period += `${years} year${years > 1 ? 's' : ''} `;
    }
    if (months > 0) {
        period += `${months} month${months > 1 ? 's' : ''} `;
    }
    if (days > 0) {
        period += `${days} day${days > 1 ? 's' : ''}`;
    }
    return period.trim();
}

calculateTotalAmount(expenses: Expense[]): number {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

deleteReport(index: number): void {
  const deletedReport = this.reports[index];
  console.log('Deleting report:', deletedReport);
  console.log('Deleting report:', );
  
  this.reportService.deleteReport(deletedReport.reportID).subscribe(() => {
    this.loadReports();
  });
}

}
