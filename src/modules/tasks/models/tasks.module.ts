export interface Task {
  id: number;
  title: string;
  description: string;
  statusTask: StatusTask;
}

export enum StatusTask {
  OPEN = 'Open',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}
