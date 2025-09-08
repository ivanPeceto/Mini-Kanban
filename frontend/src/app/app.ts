import { Component, signal } from '@angular/core';
import { Board } from './board/board';
import { ConnectionStatus } from './connection-status/connection-status';

@Component({
  selector: 'app-root',
  imports: [Board, ConnectionStatus],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
