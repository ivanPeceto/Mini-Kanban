import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import type { BoardShape, TaskUpdate } from './shared/types';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  public board$ = new BehaviorSubject<BoardShape>({todo: [], doing: [], done: []});

  constructor(){
   this.socket = io('http://localhost:3000');
   
   //snapshot inicial
   this.socket.on('board:snapshot', (board: BoardShape) => {
    this.board$.next(board);
   });

   this.socket.on('board:update', (update: TaskUpdate) =>{
    //WIP
    console.log('Update recibido', update);
   });
  }
}
