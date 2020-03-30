import { PipeTransform, BadRequestException } from '@nestjs/common';
import { StatusTask } from '../enum/status-task.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  // Creamos una lista de datos para hacer la validación del estado
  readonly allowedStatuses = [
    StatusTask.OPEN,
    StatusTask.IN_PROGRESS,
    StatusTask.DONE,
  ];

  // funcion donde ingresa el valor, se da una respuesta al Controller
  transform(value: any) {
    // value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`The status ${value} is invalid.`);
    }
    return value;
  }

  // Creamos una función que recorra la lista de datos y devolver un boolean
  private isStatusValid(status: StatusTask) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
