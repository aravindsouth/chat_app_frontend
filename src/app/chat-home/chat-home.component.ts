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
    const apiKey = 'x9kbujw7tyrj';
    const userId = 'shrill-scene-5';
    const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic2hyaWxsLXNjZW5lLTUifQ.kPbjqyv-va-W2qpv8qvTPUtwGucFBFmuSEaXbIsMWoE';
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
