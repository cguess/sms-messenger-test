import { Routes } from '@angular/router';
import {NewMessageComponent} from './new-message/new-message.component';
import { MessageHistoryComponent } from './message-history/message-history.component';

export const routes: Routes = [
    {
        path: '',
        component: MessageHistoryComponent,
        title: 'Message history',
    },
    {
        path: 'new-message',
        component: NewMessageComponent,
        title: 'New message',
    },
];

export default routes;
