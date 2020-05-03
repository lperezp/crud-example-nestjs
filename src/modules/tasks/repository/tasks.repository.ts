import { Repository, EntityRepository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { StatusTask } from '../enum/status-task.enum';
import { CreateTasksDTO } from '../dto/tasks.dto';
import { User } from 'src/modules/auth/entities/auth.entity';
import { FilterTasksDTO } from '../dto/filterTasks.dto';
import { Logger, InternalServerErrorException } from '@nestjs/common';

// https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md
@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  private logger = new Logger(`TasksRepository`);
  async getTasks(filterDTO: FilterTasksDTO, user: User): Promise<Task[]> {
    const { status, search } = filterDTO;
    const query = this.createQueryBuilder('task');

    query.where(`task.userId =:userId`, { userId: user.id });
    // andWhere es para agregar condiciones where ... andWhere
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    try {
      // getMany() retorna todos los datos de la tabla
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user "${
          user.username
        }". Filters: ${JSON.stringify(filterDTO)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDTO: CreateTasksDTO, user: User): Promise<Task> {
    const { title, description } = createTaskDTO;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = StatusTask.OPEN;
    task.user = user;

    try {
      await task.save();
      delete task.user;
      return task;
    } catch (error) {
      this.logger.error(
        `Failed to save task for user "${
          user.username
        }". Data: ${JSON.stringify(createTaskDTO)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
