import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpTaskService } from '../services/http.task.client';
import { AuthService } from '../services/auth.service';
import { ITask } from '../view-tasks/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  taskForm: FormGroup;
  message: string;

  constructor(private fb: FormBuilder,
    private httpTaskService: HttpTaskService,
    public authService: AuthService,
    private router: Router) {
    this.message = '';
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: '',
      description: '',
      estimateDate: '',
      status: ''
    });
  }

  save() {
    console.log(this.taskForm);
    let newTask: any = {      
      title: this.taskForm.controls['title'].value,
      description: this.taskForm.controls['description'].value,
      estimateDate: this.taskForm.controls['estimateDate'].value,
      status: "PENDING",
      "user":{
              "id":this.authService.getUserId()              
      }
    }
    this.httpTaskService.addTask(newTask).subscribe((resp: any) => {
      this.taskForm.reset();
      this.message = `Task ${resp} created`;
      setTimeout(function () {
        this.message = '';
      }.bind(this), 2500);
    });

    console.log('Saved: ' + JSON.stringify(this.taskForm.value));
  }
  validDate(){
    let isValid: boolean = false;
    let todayDateTemp = new Date();
    let todayDate = new Date(todayDateTemp.getFullYear(),todayDateTemp.getMonth(),todayDateTemp.getDate());
    let selectedDate = new Date(this.taskForm.controls['estimateDate'].value);
    selectedDate.setDate(selectedDate.getDate()+1);
    console.log(`${selectedDate}`);
    console.log(`${selectedDate} >= ${todayDate}`);

    if(selectedDate>=todayDate){
      isValid = true;
    }
    else{
      this.taskForm.controls['estimateDate'].setErrors({'incorrect':true});
    }
    console.log(selectedDate>=todayDate);
    
    return isValid;
  }
  onBack(): void {    
    this.router.navigate(['viewtasks'])
  }
}
