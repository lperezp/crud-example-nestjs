import { Repository, EntityRepository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { StatusTask } from '../enum/status-task.enum';
import { CreateTasksDTO } from '../dto/tasks.dto';
import { User } from 'src/modules/auth/entities/auth.entity';

// https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md
@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDTO): Promise<Task[]> {
    const { status, search } = filterDTO;
    const query = this.createQueryBuilder('task');

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

    // getMany() retorna todos los datos de la tabla
    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDTO: CreateTasksDTO, user: User): Promise<Task> {
    const { title, description } = createTaskDTO;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = StatusTask.OPEN;
    task.user = user;
    await task.save();
    delete task.user;
    return task;
  }
}
