import { Injectable } from '@nestjs/common';
import { Task, StatusTask } from '../models/tasks.module';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  createTask(title: string, description: string) {
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      statusTask: StatusTask.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}