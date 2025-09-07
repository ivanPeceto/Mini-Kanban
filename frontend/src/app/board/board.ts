import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Column } from '../column/column';
import { SocketService } from '../socket.service';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { BoardShape, Task } from '../shared/types';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-board',
  imports: [AsyncPipe, Column, DragDropModule],
  templateUrl: './board.html',
  styleUrl: './board.css',
  standalone: true,
})
export class Board {
  private socketService = inject(SocketService);
  private taskService = inject(TaskService);
  board$ = this.socketService.board$;

  handleTaskDrop(event: CdkDragDrop<Task[]>): void{
    const { previousContainer, container, item, previousIndex, currentIndex } = event;
    const task = item.data as Task;

    if (previousContainer === container){
      return;
    }

    const newColumn = container.id as keyof BoardShape;
    this.taskService.moveTask(task.id, newColumn).subscribe({
      error: (err) => console.error('Error moviendo la task:', err),
    })
  }
}
