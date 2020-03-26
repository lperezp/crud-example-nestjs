import { Injectable } from '@nestjs/common';
import { Task, StatusTask } from '../models/tasks.module';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }
}
