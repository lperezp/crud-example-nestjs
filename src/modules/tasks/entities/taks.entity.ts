import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { StatusTask } from '../models/tasks.models';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: StatusTask;
}
