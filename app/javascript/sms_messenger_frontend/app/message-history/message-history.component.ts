import { Component, inject } from '@angular/core';
import { MessagesService } from '../messages.service';
import { Message } from '../message';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

// This is the component for the message history page
// It is used to display the message history for a user
@Component({
  selector: 'app-message-history',
  imports: [CommonModule, RouterModule],
  templateUrl: './message-history.component.html',
  styleUrl: './message-history.component.scss'
})
export class MessageHistoryComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  messagesService: MessagesService = inject(MessagesService);
  messages: Message[] = [];
  
  constructor() {
  }

  // Gets the messages for the user from the DB
  ngOnInit() {
    this.messagesService.getMessages(localStorage.getItem('session_id') || '').then(messages => {
      this.messages = messages;
    });
  }
}
