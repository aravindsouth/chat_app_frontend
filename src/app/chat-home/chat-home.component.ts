import { Component, OnInit } from '@angular/core';
import { ChatClientService, ChannelService, StreamI18nService } from 'stream-chat-angular';
import { AuthService } from '../auth.service';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.css']
})
export class ChatHomeComponent implements OnInit {

  id!: string;
  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private auth: AuthService
  ) { 
    // this.chatService.init(apiKey, userId, userToken);
    // this.streamI18nService.setTranslation();
    // const userId = localStorage.getItem('user_id')
    // this.streamI18nService.setTranslation();
    // this.chatService.init('x9kbujw7tyrj', localStorage.getItem('user_id')!, localStorage.getItem('chattoken'));

    const apiKey = 'x9kbujw7tyrj';
    this.id = localStorage.getItem('user_id')!
    console.log(typeof(this.id))
    this.streamI18nService.setTranslation();
    this.chatService.init(apiKey, this.id, localStorage.getItem('chat_token'));
  }
  
  chat_form!: UntypedFormGroup;

  ngOnInit(): void {
  // const channel = this.chatService.chatClient.channel('messaging', 'talking-about-angular', {
  //   // add as many custom fields as you'd like
  //   image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
  //   name: 'Talking about Angular',
  // });
  // this.streamI18nService.setTranslation();
  // this.chatService.init('x9kbujw7tyrj', localStorage.getItem('user_id')!, localStorage.getItem('chattoken'));
  // this.auth.createToken(localStorage.getItem('user_id'))
  // .subscribe(res => {
  //   console.log(res)
  //   if(res.status) {
  //   this.chatService.init('x9kbujw7tyrj', res.user_id, res.token);
  //   console.log("token created")
  //   }
  //   else {
  //     console.log("token creation error")
  //   }
  // })
  // await channel.create();
  // this.channelService.init({
  //   type: 'messaging',
  //   id: { $eq: 'talking-about-angular' },
  // });

  this.channelService.init({
    type: 'messaging',
    members: { $in: [localStorage.getItem('user_id')] },
  });

  this.chat_form = new UntypedFormGroup({
    channel_name: new UntypedFormControl('', Validators.minLength(4)),
    contact_name: new UntypedFormControl('', Validators.minLength(4))
  });

}
  async channelAdd(value: any) {
    console.log(value);
    if(value.contact_name.length < 3) {
    console.log("channel adding")
    const channel = this.chatService.chatClient.channel('messaging', value.channel_name, {
    name: value.channel_name,
    members: [localStorage.getItem('user_id')!]
  });
  await channel.create();
    }
    else {
      console.log("add contact to channel")
      const filter = { type: 'messaging', id: { $in: [value.channel_name] } };
      const channels = await this.chatService.chatClient.queryChannels(filter);
      const response = await this.chatService.chatClient.queryUsers({ name: { $eq: value.contact_name } });
      console.log("channels found", channels)
      console.log("contact found", response)
      channels.map((channel) => {
        // console.log(channel.data.name, channel.cid)
        channel.addMembers([response.users[0].id]);
    })
    }
  }

}
