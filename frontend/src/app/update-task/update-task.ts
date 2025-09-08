import { ChangeDetectionStrategy, Component, inject, input, output, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../shared/types';

@Component({
  selector: 'app-update-task',
  imports: [ReactiveFormsModule],
  templateUrl: './update-task.html',
  styleUrl: './update-task.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateTask implements OnInit {
  update = output<{id: string; title?: string; description?: string; }>();
  cancel = output<void>();

  task = input.required<Task>();

  private formbuilder = inject(FormBuilder);
  taskForm = this.formbuilder.nonNullable.group({
    title: ['', [Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(500)]]
  });

  ngOnInit(): void {
    this.taskForm.patchValue({
      title: this.task().title,
      description: this.task().description,
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }
    const taskToEmit = {
      id: this.task().id,
      title: this.taskForm.getRawValue().title,
      description: this.taskForm.getRawValue().description,
    }

    this.update.emit(taskToEmit);
  }
}
