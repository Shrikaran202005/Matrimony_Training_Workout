import { Component } from '@angular/core';
import { PollComponent } from './component/poll/poll'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PollComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'live-polling';
}