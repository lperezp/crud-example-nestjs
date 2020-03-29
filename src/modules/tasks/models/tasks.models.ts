export interface Task {
  id: string;
  title: string;
  description: string;
  statusTask: StatusTask;
}

export enum StatusTask {
  OPEN = 'Open',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}
