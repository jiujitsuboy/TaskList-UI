import { Component, OnInit } from '@angular/core';
import { ITask } from './task.model';
import { HttpTaskService } from '../services/http.task.client';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})
export class ViewTasksComponent implements OnInit {

  pageNro: number;
  totalPageNro: number;
  tasks: ITask[] = [{
    id: 1,
    title: 'Titulo 1',
    description: "Mi tarea 1",
    estimateDate: new Date("2020-02-02"),
    status: "DONE"
  },
  {
    id: 2,
    title: 'Titulo 2',
    description: "Mi tarea 2",
    estimateDate: new Date("2020-02-02"),
    status: "PENDING"
  }];

  constructor(private httpTaskService: HttpTaskService,
    public authService: AuthService) {
    this.pageNro = 0;
    this.totalPageNro = 1;
  }

  ngOnInit(): void {
    this.getTask();  
  }

  changeStatus(taskId: number) {
    console.log(`Change status for ${taskId}`);
    this.httpTaskService.updateTask(taskId,"DONE").subscribe(()=>{
      this.getTask();
    });
  }
  getPage(newPageNro: number) {
    console.log(`siguiente pagina solicitada ${newPageNro}`);
    this.pageNro = newPageNro;
    this.getTask();
  }
  getTask(){
    this.httpTaskService.pageNro = this.pageNro;
    this.httpTaskService.getTasks(this.authService.getUser()).subscribe((pageInfo: any) => {
      this.pageNro = pageInfo.nroPage;
      this.totalPageNro = pageInfo.totalPages;
      this.tasks = pageInfo.taskPerPage;
    });
  }
}
