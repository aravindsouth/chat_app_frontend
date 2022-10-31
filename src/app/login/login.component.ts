import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  constructor(private _auth: AuthService, private _router: Router) { }
  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('email'),
      password: new FormControl
    });
  }

  loginSubmit(value: any) {
    console.log(value);
    this._auth.loginUser(value)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        if(res.status) {

        localStorage.setItem('user_email', value.email);
        this._router.navigate(['chat-home']);
        }
        else {
        console.log(res.status)
        alert("invalid username or password")
        }
      }
    )
  }

}
