import { StatusTask } from '../models/tasks.models';

export class FilterTasksDTO {
  status: StatusTask;
  search: string;
}
