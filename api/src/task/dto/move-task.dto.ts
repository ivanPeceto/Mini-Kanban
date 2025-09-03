import { IsEnum, IsNotEmpty } from 'class-validator';
import type { TaskColumn } from '../entities/task.entity';
export class MoveTaskDto {
  @IsNotEmpty({ message: 'La columna no puede estar vacía' })
  @IsEnum(['todo', 'doing', 'done'], {
    message: "La columna debe ser 'todo', 'doing', 'done'",
  })
  column: TaskColumn;
}
