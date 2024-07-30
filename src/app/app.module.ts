import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';

// For Home Component
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CategoryComponent } from './category/category.component';
import { ReportComponent } from './report/report.component';


// For Expense Component
import { ExpenseComponent } from './expense/expense.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MatDateFormats, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    ExpenseComponent,
    CategoryComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

