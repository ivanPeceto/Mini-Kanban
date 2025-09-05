import { Component, Input } from '@angular/core';
import { Task } from '../shared/types';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css'
})
export class TaskCard {
  @Input({required:true}) task!: Task;
}
