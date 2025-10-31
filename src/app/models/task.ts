export interface Task {
  id: number;
  title: string;
  description?: string;
  done: boolean;
  priority?: 'low'|'medium'|'high';
}
