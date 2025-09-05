import { Component, Input } from '@angular/core';
import { Task } from '../socket.service';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css'
})
export class TaskCard {
  @Input({required:true}) task!: Task;
}
