import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTask {
  create = output<{ title: string; description?: string }>();
  cancel = output<void>();

  private formbuilder = inject(FormBuilder);
  taskForm = this.formbuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(500)]]
  });

  onSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }
    this.create.emit(this.taskForm.getRawValue());
  }
}
