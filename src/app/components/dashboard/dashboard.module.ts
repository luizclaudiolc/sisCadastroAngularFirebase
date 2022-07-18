import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppModalEditProductModule } from 'src/app/shared/modal-edit-product/modal-edit-product.module';
import { AppModalAddProductModule } from '../../shared/modal/modal.module';
import {MatListModule} from '@angular/material/list';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavBarModule } from 'src/app/shared/nav-bar/nav-bar.module';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    AppModalAddProductModule,
    AppModalEditProductModule,
    MatListModule,
    NavBarModule,
    MatTooltipModule
  ]
})
export class DashboardModule { }
