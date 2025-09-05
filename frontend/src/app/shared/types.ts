export interface Task {
  id: string;
  title: string;
  description?: string;
  column: 'todo' | 'doing' | 'done';
}

export interface BoardShape {
  todo: Task[];
  doing: Task[];
  done: Task[];
}

export interface TaskUpdate {
  type: 'created' | 'moved' | 'deleted';
  task?: Task; 
  task_id?: string; 
}