import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Column } from '../column/column';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-board',
  imports: [AsyncPipe, Column],
  templateUrl: './board.html',
  styleUrl: './board.css',
  standalone: true,
})
export class Board {
  private socketService = inject(SocketService);
  board$ = this.socketService.board$;
}
