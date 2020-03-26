import { Controller, Get } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/tasks.module';

@Controller('tasks')
export class TasksController {
  constructor(private tskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tskService.getAllTasks();
  }
}
