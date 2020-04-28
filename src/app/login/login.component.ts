import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: string;

  constructor(private fb: FormBuilder,
    private router: Router,
    public authService: AuthService) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      user: '',
      password: ''
    });
  }
  login(): boolean {
    this.message = '';
    let username = this.loginForm.controls['user'].value;
    let password = this.loginForm.controls['password'].value;    

    this.authService.login(username, password).subscribe(
      (resp:boolean)=>{
        if (!resp) {
          this.message = 'Incorrect credentials.';
          setTimeout(function () {
            this.message = '';
          }.bind(this), 2500);
        }
        else {
          this.router.navigate(['viewtasks']);
        }
      }
    );
    return false;
  }
}
