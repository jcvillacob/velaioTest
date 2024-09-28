import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { FilterButtonComponent } from "./shared/filter-button/filter-button.component";
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { tasksReducer } from './state/reducers/tasks/tasks.reducer';
import { TasksEffects } from './state/effects/tasks/tasks.effects';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    CreateTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FilterButtonComponent,
    ReactiveFormsModule,
    StoreModule.forRoot({ tasks: tasksReducer }),
    EffectsModule.forRoot([TasksEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
