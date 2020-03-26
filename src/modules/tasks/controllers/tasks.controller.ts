import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/tasks.module';

@Controller('tasks')
export class TasksController {
  constructor(private tskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tskService.getAllTasks();
  }

  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    return this.tskService.createTask(title, description);
  }
}
