import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { HttpClientModule } from '@angular/common/http';

import { AUTH_PROVIDERS } from './services/auth.service';
import { LoggedInGuard } from './services/route.guard';
import { LogoutComponent } from './logout/logout.component';
import { HTTP_USER_PROVIDERS } from './services/http.user.client';
import { HTTP_TASK_PROVIDERS } from './services/http.task.client';
import { API_INTERCEPTOR_PROVIDERS } from './http.interceptor';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateTaskComponent,
    ViewTasksComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger',
    })
  ],
  providers: [
    API_INTERCEPTOR_PROVIDERS,
    HTTP_USER_PROVIDERS,
    HTTP_TASK_PROVIDERS,
    AUTH_PROVIDERS,
    CookieService,
    LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
