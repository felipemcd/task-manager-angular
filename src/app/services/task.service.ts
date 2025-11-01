import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task';

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Estudar Angular',
    description: 'Revisar signals e standalone components',
    priority: 'high',
    status: 'todo',
    due: new Date(Date.now() + 86400000).toISOString().split('T')[0]
  },
  {
    id: '2',
    title: 'Projeto PWEB',
    description: 'Migrar app para Angular',
    priority: 'medium',
    status: 'doing',
    due: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0]
  },
  {
    id: '3',
    title: 'Lavar louça',
    description: 'Deixar a cozinha limpa',
    priority: 'low',
    status: 'done',
    due: new Date(Date.now() - 86400000).toISOString().split('T')[0]
  }
];

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks = signal<Task[]>(INITIAL_TASKS);

  constructor() { }

  add(newTask: Omit<Task, 'id' | 'status'>) {
    const taskWithDefaults: Task = {
      ...newTask,
      id: Date.now().toString(),
      status: 'todo',
    };
    this.tasks.update(currentTasks => [taskWithDefaults, ...currentTasks]);
  }

  updateStatus(id: string, newStatus: 'todo' | 'doing' | 'done') {
    this.tasks.update(currentTasks =>
      currentTasks.map(task => {
        if (task.id === id) {
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  }

  toggleStatus(id: string) {
    this.tasks.update(currentTasks =>
      currentTasks.map(task => {
        if (task.id === id) {
          const newStatus = task.status === 'done' ? 'todo' : 'done';
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  }

  remove(id: string) {
    this.tasks.update(currentTasks => currentTasks.filter(task => task.id !== id));
  }
}