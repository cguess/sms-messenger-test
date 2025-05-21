import { Injectable } from '@angular/core';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  constructor() { }
  
  // Gets the messages for the user from the DB
  async getMessages(session_id: string): Promise<Message[]> {
    // return this.messages.filter(message => message.sender === session_id || message.receiver === session_id);
    const response = await fetch(`/messages?session_id=${session_id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const messages = await response.json();
      return messages;
    } else {
      console.error('Failed to get messages.');
      return [];
    }
  }

  // Sends a message to the backend
  async sendMessage(session_id: string, message: string) {
    console.log(
      `Message sent: ${message} to session ${session_id}.`,
    );

    const messageObject = { 
      message: {
        session_id: session_id,
        sender: session_id,
        receiver: '+1234567890',
        text: message,
        date: new Date().toISOString(),
      }
    }

    // Sends a message to the backend using the API
    const response = await fetch(`/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageObject),
    });

    // If the message is sent successfully, return true
    if (response.ok) {
      console.log('Message sent successfully.');
      return true;
    } else {
      // If the message is not sent successfully, return the error message
      // This is handled in the component
      console.error('Failed to send message.');
      return response.json();
    }
  }

  // Gets the session ID from the local storage
  // This is used to send the message to the correct user
  getSessionId(): string {
    return localStorage.getItem('session_id') || '';
  }
}
