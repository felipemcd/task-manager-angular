import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task';

function addDaysISO(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Ler capítulo 3 de Algoritmos',
    description: 'Priorizar exercícios 3.1-3.5',
    priority: 'high',
    status: 'todo',
    due: addDaysISO(2)
  },
  {
    id: '2',
    title: 'Resolver lista de TS',
    description: 'Atenção a generics',
    priority: 'medium',
    status: 'doing',
    due: addDaysISO(5) 
  },
  {
    id: '3',
    title: 'Revisão rápida: HTML/CSS',
    description: '30 minutos',
    priority: 'low',
    status: 'done',
    due: addDaysISO(10) 
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

  update(id: string, updatedTaskData: Partial<Omit<Task, 'id' | 'status'>>) {
    this.tasks.update(currentTasks =>
      currentTasks.map(task => {
        if (task.id === id) {
          return { ...task, ...updatedTaskData };
        }
        return task;
      })
    );
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