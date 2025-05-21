import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {MessagesService} from '../messages.service';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

// This is the component for the new message page
// It is used to send a new message to a user
@Component({
  selector: 'app-new-message',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.scss'
})
export class NewMessageComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  messagesService: MessagesService = inject(MessagesService);
  message: FormControl = new FormControl('');

  sendMessageForm = new FormGroup({
    phoneNumber: new FormControl(''), // The phone number of the user to send the message to since we are using a free Twilio trial account the phone number must be a valid Twilio phone number
    message: new FormControl(''), // The message to send to the user  
  });

  submitError: string = '';

  constructor() {
  }

  // Sends a message to the user
  async sendMessage() {
    const session_id = localStorage.getItem('session_id');
    const text = this.sendMessageForm.get('message')?.value;

    // If the message is not valid, do not send it
    if (!this.isMessageLengthValid()) {
      return;
    }

    // If the message is valid, send it to the user
    if (text && session_id) {
      const response = await this.messagesService.sendMessage(session_id, text);
      if (response.success) {
        // If the message is sent successfully, navigate to the home page and reload the page
        this.router.navigate(['/'], { onSameUrlNavigation: 'reload' });
      } else {
        // If the message is not sent successfully, set the error message and display it to the user
        // This isn't prettily formatted because the error is returned from the backend as a string
        this.submitError = response.error;
        console.error('Failed to send message.');
        console.error(response);
      }
    }
  }

  // Returns the error message if there is one
  getSubmitError() {
    if (this.submitError) {
      return this.submitError;
    }
    return '';
  }

  // Returns the error message if the message is too long
  getMessageLengthError() {
    if (!this.isMessageLengthValid()) {
      return 'Message is too long';
    }
    return '';
  }

  // Clears the form
  clearForm() {
    this.sendMessageForm.reset();
  }

  // Returns the length of the message used to display the character count and color
  getMessageLength() {
    const text = this.sendMessageForm.get('message')?.value;
    if (text) {
      return text.length;
    }
    return 0;
  }

  // Returns the color of the message length
  getMessageLengthColor() {
    const length = this.getMessageLength();
    if (length > 250) {
      return 'red';
    }
    return 'black';
  }

  // Returns true if the message is valid and under 250 characters
  isMessageLengthValid() {
    if (this.sendMessageForm.get('phoneNumber')?.value === '') {
      return true;
    }

    const text = this.sendMessageForm.get('message')?.value;

    if (text && text.length > 0) {
      return text.length <= 250;
    } 

    return false;
  }
}
