import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _router:Router, private _auth: AuthService) { }

  form!: UntypedFormGroup;
  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      username: new UntypedFormControl('',Validators.minLength(4)),
      email: new UntypedFormControl('email', Validators.email),
      password: new UntypedFormControl('', Validators.minLength(4))
    });
  }

  signupSubmit(value:any) {
    console.log(value);
    const user = {
      email: value.email,
      password: value.password,
      username: value.username
    }
    console.log(value);
    console.log(user)
    this._auth.userSignUp(user)
    .subscribe((data) =>{
      let status = data.status
      console.log(status)
      console.log(data.reason)
      // this._router.navigate(['login'])
      // alert('New user added')
      if (!status) {
        alert("User already exists")
        this._router.navigate(["/signup"])
        window.location.reload();
      }
      else {
        console.log("new user added")
        this._router.navigate(["/login"])
      }
    })
  }
}
