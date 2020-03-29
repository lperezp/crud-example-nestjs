import { Injectable } from '@nestjs/common';
import { Task, StatusTask } from '../models/tasks.module';
import { v4 as uuidv4 } from 'uuid';
import { CreateTasksDTO } from '../dto/tasks.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string) {
    return this.tasks.find(task => task.id === id);
  }

  createTask(createTask: CreateTasksDTO) {
    const { title, description } = createTask;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      statusTask: StatusTask.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateTask(id: string, status) {
    const task = this.tasks.find(task => task.id === id);
    console.log('task', task);
    task.statusTask = status;
    return task;
  }
}
