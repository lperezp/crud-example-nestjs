import { Repository, EntityRepository } from 'typeorm';
import { Task } from '../entities/taks.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {}
