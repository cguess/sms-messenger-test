import {Component} from '@angular/core';
// import {HomeComponent} from './home/home.component';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SMS Messenger';
  session_id = localStorage.getItem('session_id');
  // This is the new session ID which is used to identify the user, should be used as a phone number / Devise user key
  session_id_new = Math.random().toString(36).substring(2, 15);
  
  constructor() {
    console.log('AppComponent constructor');
    // If the session ID is not in the local storage, set it to a new random value which is used to identify the user
    if (!this.session_id) {
      localStorage.setItem('session_id', this.session_id_new);
    }
  }
}
