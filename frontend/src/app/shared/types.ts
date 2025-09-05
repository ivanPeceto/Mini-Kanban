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