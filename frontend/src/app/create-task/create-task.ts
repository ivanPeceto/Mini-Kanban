import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTask {
  create = output<{ title: string; description?: string; column: string }>();
  cancel = output<void>();
  listId = input.required<string>();

  private formbuilder = inject(FormBuilder);
  taskForm = this.formbuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(500)]]
  });

  onSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }
    const task = {
      title: this.taskForm.getRawValue().title,
      description: this.taskForm.getRawValue().description,
      column: this.listId(),
    }
    this.create.emit(task);
  }
}
