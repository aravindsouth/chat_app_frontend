import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

const cors = require('cors')({origin: true});
const StreamChat = require('stream-chat').StreamChat;

const serverStreamClient = StreamChat.getInstance(
'x9kbujw7tyrj', { timeout: 6000,}
);


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _router:Router, private _auth: AuthService) { }

  form!: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(),
      email: new FormControl('email'),
      password: new FormControl
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
        
        try {
          serverStreamClient.upsertUser({
            id: data.uid,
            name: data.name,
            email: data.email
        })}
        catch (error) {
          console.log(error)
        }

        console.log("new user added")
        this._router.navigate(["/login"])
      }
    })
  }
}
