import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatClientService, ChannelService, StreamI18nService } from 'stream-chat-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _router: Router, private chatService: ChatClientService) { }

  ngOnInit(): void {
  }
  logedIn() {
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_id');
    localStorage.removeItem('chat_token')
    // this.chatService.chatClient.disconnect()
    this._router.navigate(['login'])
  }

}
