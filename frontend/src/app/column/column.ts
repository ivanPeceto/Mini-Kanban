import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { Task } from '../shared/types';
import { CreateTask } from '../create-task/create-task';
import { TaskService } from '../task.service';
import { CdkDragDrop, DragDropModule } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-column',
  imports: [TaskCard, CreateTask, DragDropModule],
  templateUrl: './column.html',
  styleUrl: './column.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Column {
  title = input.required<string>();
  tasks = input.required<Task[]>();
  listId = input.required<string>();
  listData = input.required<Task[]>();

  dropped = output<CdkDragDrop<Task[]>>();

  isCreatingNewTask = signal(false);

  private taskService = inject(TaskService);

  handleCreateTask(taskData: {title: string; description?: string}): void{
    this.taskService.createTask(taskData).subscribe({
      next: () => this.isCreatingNewTask.set(false),
      error: (err) => console.error('Error creando la task:', err),
    });
  }

  toggleCreateTask(): void {
    this.isCreatingNewTask.update((isCreating) => !isCreating);
  }

  handleDeleteTask(taskData: {id: string}): void{
    this.taskService.deleteTask(taskData).subscribe({
      error: (err) => console.error('Error eliminando la task:', err),
    })
  }
}
