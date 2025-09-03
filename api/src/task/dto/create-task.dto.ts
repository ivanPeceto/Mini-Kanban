import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'El título debe ser un texto válido.' })
  @IsNotEmpty({ message: 'El título no puede estar vacío' })
  @MaxLength(100, {
    message: 'El título no puede tener más de 100 caracteres.',
  })
  title: string;

  @IsString({ message: 'La descripción debe ser un texto válido.' })
  @IsOptional()
  @MaxLength(500, {
    message: 'La descripción no puede tener más de 500 caractéres.',
  })
  description?: string;
}
