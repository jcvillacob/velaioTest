import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { FilterButtonComponent } from "./shared/filter-button/filter-button.component";

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FilterButtonComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
