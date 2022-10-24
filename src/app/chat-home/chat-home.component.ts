import { Component, OnInit } from '@angular/core';
import { ChatClientService, ChannelService, StreamI18nService } from 'stream-chat-angular';

@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.css']
})
export class ChatHomeComponent implements OnInit {

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
  ) { 
    const apiKey = 'dz5f4d5kzrue';
    const userId = 'rough-base-2';
    const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicm91Z2gtYmFzZS0yIiwiZXhwIjoxNjY2NjQxNzEwfQ.2raVJIyVpAA0bKMNTpaIEXipmILrMnAtpNnHeq6AN3k';
    this.chatService.init(apiKey, userId, userToken);
    this.streamI18nService.setTranslation();
  }

 async ngOnInit() {
  const channel = this.chatService.chatClient.channel('messaging', 'talking-about-angular', {
    // add as many custom fields as you'd like
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
    name: 'Talking about Angular',
  });
  await channel.create();
  this.channelService.init({
    type: 'messaging',
    id: { $eq: 'talking-about-angular' },
  });
  }

}
