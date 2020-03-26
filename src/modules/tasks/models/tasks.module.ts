export interface Task {
  id: number;
  title: string;
  description: string;
  statusTask: StatusTask;
}

export enum StatusTask {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN PROGRESS',
  DONE = 'DONE',
}
