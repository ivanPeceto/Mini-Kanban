import { Component, signal } from '@angular/core';
import { Board } from './board/board';

@Component({
  selector: 'app-root',
  imports: [Board],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
