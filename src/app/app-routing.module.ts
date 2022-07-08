import { NgModule } from '@angular/core';
import {
  AuthGuard,
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/']);
const redirectLoggedIntoDashboard = () => redirectLoggedInTo(['/dashboard']);

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import('./components/auth/auth.module').then((m) => m.AuthModule),
      ...canActivate(redirectLoggedIntoDashboard),
    /* canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectLoggedIntoDashboard,
    }, */
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    ...canActivate(redirectUnauthorizedToLogin),
    /* canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    }, */
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
