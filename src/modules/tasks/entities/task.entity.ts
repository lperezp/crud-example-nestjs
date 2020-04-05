import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { StatusTask } from '../enum/status-task.enum';

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
