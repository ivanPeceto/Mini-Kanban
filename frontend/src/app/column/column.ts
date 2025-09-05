import { Component, Input } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { Task } from '../shared/types';

@Component({
  selector: 'app-column',
  imports: [TaskCard],
  templateUrl: './column.html',
  styleUrl: './column.css'
})
export class Column {
  @Input() title: string = '';
  @Input() tasks: Task[] = [];
}
