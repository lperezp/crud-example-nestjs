import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateTasksDTO } from '../dto/tasks.dto';
import { TasksService } from '../services/tasks.service';
import { FilterTasksDTO } from '../dto/filterTasks.dto';
import { TaskStatusValidationPipe } from '../pipes/pipes-status-validation.pipe';
import { Task } from '../entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tskService: TasksService) {}

  // @Get()
  // getAllTasks(@Query(ValidationPipe) filterDTO: FilterTasksDTO): Task[] {
  //   if (Object.keys(filterDTO).length) {
  //     return this.tskService.getTasksWithFilter(filterDTO);
  //   } else {
  //     return this.tskService.getAllTasks();
  //   }
  // }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTask: CreateTasksDTO): Promise<Task> {
    return this.tskService.createTask(createTask);
  }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string) {
  //   this.tskService.deleteTask(id);
  // }

  // @Put('/:id')
  // updateTask(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: StatusTask,
  // ) {
  //   return this.tskService.updateTask(id, status);
  // }
}
