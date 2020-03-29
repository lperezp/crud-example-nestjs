import { Injectable } from '@nestjs/common';
import { Task, StatusTask } from '../models/tasks.models';
import { v4 as uuidv4 } from 'uuid';
import { CreateTasksDTO } from '../dto/tasks.dto';
import { FilterTasksDTO } from '../dto/filterTasks.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTasksWithFilter(filterDTO: FilterTasksDTO): Task[] {
    const { search, status } = filterDTO;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.statusTask === status);
    }

    if (search) {
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
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

  updateTask(id: string, status: StatusTask) {
    const task = this.tasks.find(task => task.id === id);
    task.statusTask = status;
    return task;
  }
}
