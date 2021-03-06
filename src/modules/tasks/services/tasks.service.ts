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

  getTasks(filterDTO: FilterTasksDTO, user: User): Promise<Task[]> {
    return this.tskRepository.getTasks(filterDTO, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.tskRepository.findOne({
      where: { id, userId: user.id },
    });
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

  async deleteTask(id: number, user: User): Promise<void> {
    const found = await this.tskRepository.delete({ id, userId: user.id });
    if (found.affected === 0) {
      throw new NotFoundException(`Task with Id ${id} not found.`);
    }
  }

  async updateTask(id: number, status: StatusTask, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
