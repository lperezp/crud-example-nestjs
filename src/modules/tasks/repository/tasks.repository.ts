import { Repository, EntityRepository } from 'typeorm';
import { Task } from '../entities/taks.entity';
import { StatusTask } from '../enum/status-task.enum';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTask): Promise<Task> {
    const { title, description } = createTask;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = StatusTask.OPEN;
    await task.save();

    return task;
  }
}
