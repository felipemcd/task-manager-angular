import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // initial database (exported by the service)
  private initial: Task[] = [
    { id: 1, title: 'Estudar Angular', description: 'Revisar signals e standalone components', done: false, priority: 'high' },
    { id: 2, title: 'Projeto PWEB', description: 'Migrar app para Angular', done: false, priority: 'medium' },
    { id: 3, title: 'Lavar louça', done: true, priority: 'low' }
  ];

  // signal that holds app state
  tasks = signal<Task[]>(this.initial.slice());

  // simple id counter
  private nextId = Math.max(...this.initial.map(t=>t.id)) + 1;

  // read
  list() { return this.tasks; }

  // create
  add(task: Partial<Task>) {
    const newTask: Task = {
      id: this.nextId++,
      title: task.title || 'Nova tarefa',
      description: task.description,
      done: !!task.done,
      priority: task.priority || 'low'
    };
    this.tasks.update(prev => [newTask, ...prev]);
    return newTask;
  }

  // update by id
  toggleDone(id: number) {
    this.tasks.update(prev => prev.map(t => t.id === id ? ({...t, done: !t.done}) : t));
  }

  // delete
  remove(id: number) {
    this.tasks.update(prev => prev.filter(t => t.id !== id));
  }
}
