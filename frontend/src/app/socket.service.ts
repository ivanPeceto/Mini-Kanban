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

   this.socket.on('board:update', (update: TaskUpdate) => { 
    this.processBoardUpdate(update);
   });
  }

  private processBoardUpdate(update: TaskUpdate): void {
    const board = this.board$.getValue();
    let newBoard: BoardShape;

    switch (update.type) {
      case 'created':
        if (update.task) {
          newBoard = {
            ...board,
            todo: [update.task, ...board.todo],
          };
          this.board$.next(newBoard);
        }
        break;
      
      case 'deleted':
        if (update.task_id) {
          newBoard = {
            todo: board.todo.filter((task) => task.id !== update.task_id),
            doing: board.doing.filter((task) => task.id !== update.task_id),
            done: board.done.filter((task) => task.id !== update.task_id),
          };
          this.board$.next(newBoard);
        }
        break;

      case 'moved':
        if (update.task) {
          const movedTask = update.task;
          const newBoard = { ...board };
          
          // Elimina la tarea de todas las columnas para evitar duplicados
          (Object.keys(newBoard) as Array<keyof BoardShape>).forEach(columnKey => {
            newBoard[columnKey] = newBoard[columnKey].filter(t => t.id !== movedTask.id);
          });
          
          newBoard[movedTask.column] = [movedTask, ...newBoard[movedTask.column]];

          this.board$.next(newBoard);
        }
        break;

      case 'updated':
        if (update.task) {
          const updatedTask = update.task;
          const newBoard = { ...board };

          (Object.keys(newBoard) as Array<keyof BoardShape>).forEach(columnKey => {
            let taskIndex = newBoard[columnKey].findIndex(t => t.id === updatedTask.id);
            if (taskIndex !== -1){
              newBoard[columnKey][taskIndex] = updatedTask;
            }
          });
        }
        break;
    }
  }

}
