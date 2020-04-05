import { IsNotEmpty } from 'class-validator';

export class CreateTasksDTO {
  // Usamos este decorador para evitar que se ingrese dato vacio
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
