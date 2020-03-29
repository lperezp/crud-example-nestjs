import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Task } from '../models/tasks.module';
import { CreateTasksDTO } from '../dto/tasks.dto';
import { TasksService } from '../services/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tskService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTask: CreateTasksDTO) {
    return this.tskService.createTask(createTask);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    this.tskService.deleteTask(id);
  }

  @Put('/:id')
  updateTask(@Param('id') id: string, @Body('status') status: string) {
    return this.tskService.updateTask(id, status);
  }
}
