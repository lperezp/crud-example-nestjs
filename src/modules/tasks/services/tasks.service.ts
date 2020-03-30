import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTasksDTO } from '../dto/tasks.dto';
import { FilterTasksDTO } from '../dto/filterTasks.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from '../repository/tasks.repository';
import { Task } from '../entities/taks.entity';
@Injectable()
// https://typeorm.delightful.studio/classes/_repository_repository_.repository.html
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tskRepository: TasksRepository,
  ) {}
  // getAllTasks() {
  //   return this.tasks;
  // }
  // getTasksWithFilter(filterDTO: FilterTasksDTO): Task[] {
  //   const { search, status } = filterDTO;
  //   let tasks = this.getAllTasks();
  //   // Revisamos si status tiene dato para realizar la búsqueda
  //   if (status) {
  //     tasks = tasks.filter(task => task.statusTask === status);
  //   }
  //   // Revisamos si search tiene dato para realizar la búsqueda
  //   if (search) {
  //     tasks = tasks.filter(
  //       task =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.tskRepository.findOne(id);
    // Agregamos esta validación cuando no hay datos con ese Id
    if (!found) {
      // Podemos agregar una respuesta personalizada
      throw new NotFoundException(`Task with Id ${id} not found.`);
    }
    return found;
  }

  // createTask(createTask: CreateTasksDTO) {
  //   const { title, description } = createTask;
  //   const task: Task = {
  //     id: uuidv4(),
  //     title,
  //     description,
  //     statusTask: StatusTask.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTask(id: string) {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter(task => task.id !== found.id);
  // }
  // updateTask(id: string, status: StatusTask) {
  //   const task = this.getTaskById(id);
  //   task.statusTask = status;
  //   return task;
  // }
}
