import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/tasks.module';
import { CreateTasksDTO } from '../dto/tasks.dto';

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
}
