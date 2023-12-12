import { Component } from '@angular/core';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent {
  // oltava public, jotta voi sitoa templaattiin
  constructor(public messageService: MessageService) {}
}
