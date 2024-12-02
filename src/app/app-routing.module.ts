import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { MyPresentsComponent } from './my-presents/my-presents.component';
import { AllPresentsComponent } from './all-presents/all-presents.component';
import { BoughtPresentsComponent } from './bought-presents/bought-presents.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'my-presents', component: MyPresentsComponent, canActivate: [AuthGuard]},
      { path: 'all-presents', component: AllPresentsComponent, canActivate: [AuthGuard]},
            { path: 'bought-presents', component: BoughtPresentsComponent, canActivate: [AuthGuard]},
  { path: 'sign-in', component: SignInComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
