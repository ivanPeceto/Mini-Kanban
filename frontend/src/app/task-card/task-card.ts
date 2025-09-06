import { Component, output, ChangeDetectionStrategy, input } from '@angular/core';
import { Task } from '../shared/types';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCard {
  task = input.required<Task>();
  delete = output<{id: string}>();

  onPressDelete(): void {
    this.delete.emit({id: this.task().id});
  }

}
