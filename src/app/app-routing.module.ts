import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import {LoggedInGuard} from './services/route.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'viewtasks', component: ViewTasksComponent, canActivate: [LoggedInGuard] },
  { path: 'createtask', component: CreateTaskComponent, canActivate: [LoggedInGuard] },
  { path: '', redirectTo: 'viewtasks', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
