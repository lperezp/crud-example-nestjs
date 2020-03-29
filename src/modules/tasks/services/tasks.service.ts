import { Injectable, NotFoundException } from '@nestjs/common';
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
    // Revisamos si status tiene dato para realizar la búsqueda
    if (status) {
      tasks = tasks.filter(task => task.statusTask === status);
    }
    // Revisamos si search tiene dato para realizar la búsqueda
    if (search) {
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  getTaskById(id: string) {
    const found = this.tasks.find(task => task.id === id);
    // Agregamos esta validación cuando no hay datos con ese Id
    if (!found) {
      // Podemos agregar una respuesta personalizada
      throw new NotFoundException(`Task with Id ${id} not found.`);
    }
    return found;
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
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }

  updateTask(id: string, status: StatusTask) {
    const task = this.getTaskById(id);
    task.statusTask = status;
    return task;
  }
}
