import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  constructor(private _auth: AuthService, private _router: Router) { }
  form!: UntypedFormGroup;

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      email: new UntypedFormControl('email'),
      password: new UntypedFormControl
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
        localStorage.setItem('user_id', res.uid);
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
