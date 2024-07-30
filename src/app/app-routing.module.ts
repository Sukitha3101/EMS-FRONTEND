import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { ExpenseComponent } from './expense/expense.component';
import { CategoryComponent } from './category/category.component';
import { ReportComponent } from './report/report.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'expenses', component: ExpenseComponent, canActivate: [AuthGuard]},
  { path: 'category', component: CategoryComponent, canActivate: [AuthGuard]},
  { path: 'reports', component: ReportComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'Home', redirectTo: 'home', pathMatch: 'full' }
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
