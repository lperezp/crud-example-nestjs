import { StatusTask } from '../models/tasks.models';
import { IsOptional, IsNotEmpty, IsIn } from 'class-validator';
export class FilterTasksDTO {
  /*
   * Agregamos el decorador @IsOptional para indicar que el campo es opcional
   * El decorador @IsIn para validar que el dato ingresado esté dentro de lo permitido
   * https://github.com/typestack/class-validator#readme
   */

  @IsOptional()
  @IsIn([StatusTask.OPEN, StatusTask.IN_PROGRESS, StatusTask.DONE])
  status: StatusTask;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
