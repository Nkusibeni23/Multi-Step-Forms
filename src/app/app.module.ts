import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormPersonnelComponent } from './components/form-personnel/form-personnel.component';
import { SelectPlanComponent } from './components/select-plan/select-plan.component';
import { AddOnsComponent } from './components/add-ons/add-ons.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { SidebarItemComponent } from './components/sidebar/sidebar-item/sidebar-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FormPersonnelComponent,
    SelectPlanComponent,
    AddOnsComponent,
    SummaryComponent,
    ThankYouComponent,
    SidebarItemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
