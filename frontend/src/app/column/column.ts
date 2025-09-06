import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { Task } from '../shared/types';
import { CreateTask } from '../create-task/create-task';

@Component({
  selector: 'app-column',
  imports: [TaskCard, CreateTask],
  templateUrl: './column.html',
  styleUrl: './column.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Column {
  title = input.required<string>();
  tasks = input.required<Task[]>();

  newTaskCreated = signal(false);
}
