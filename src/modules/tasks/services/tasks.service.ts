import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTasksDTO } from '../dto/tasks.dto';
import { FilterTasksDTO } from '../dto/filterTasks.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from '../repository/tasks.repository';
import { Task } from '../entities/task.entity';
import { StatusTask } from '../enum/status-task.enum';
import { User } from 'src/modules/auth/entities/auth.entity';
@Injectable()
// https://typeorm.delightful.studio/classes/_repository_repository_.repository.html
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tskRepository: TasksRepository,
  ) {}

  getTasks(filterDTO: FilterTasksDTO): Promise<Task[]> {
    return this.tskRepository.getTasks(filterDTO);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.tskRepository.findOne(id);
    // Agregamos esta validación cuando no hay datos con ese Id
    if (!found) {
      // Podemos agregar una respuesta personalizada
      throw new NotFoundException(`Task with Id ${id} not found.`);
    }
    return found;
  }

  async createTask(createTaskDTO: CreateTasksDTO, user: User): Promise<Task> {
    return await this.tskRepository.createTask(createTaskDTO, user);
  }

  async deleteTask(id: number): Promise<void> {
    const found = await this.tskRepository.delete(id);
    if (found.affected === 0) {
      throw new NotFoundException(`Task with Id ${id} not found.`);
    }
  }

  async updateTask(id: number, status: StatusTask): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
