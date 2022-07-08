import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NavBarModule } from 'src/app/shared/nav-bar/nav-bar.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    NavBarModule
  ]
})
export class HomeModule { }
