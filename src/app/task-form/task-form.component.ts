import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  template: `
  <div class="bg-white p-4 rounded shadow mb-4">
    <form (submit)="submit($event)" class="grid grid-cols-1 gap-2">
      <input [(ngModel)]="title" name="title" placeholder="Título" class="border p-2 rounded" required />
      <textarea [(ngModel)]="description" name="desc" rows="2" placeholder="Descrição (opcional)" class="border p-2 rounded"></textarea>
      <div class="flex gap-2">
        <select [(ngModel)]="priority" name="priority" class="border p-2 rounded">
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>
        <button class="ml-auto bg-blue-600 text-white px-4 py-2 rounded">Adicionar</button>
      </div>
    </form>
  </div>
  `
})
export class TaskFormComponent {
  title = '';
  description = '';
  priority: 'low'|'medium'|'high' = 'low';
  constructor(private taskService: TaskService) {}

  submit(ev: Event) {
    ev.preventDefault();
    if (!this.title.trim()) return;
    this.taskService.add({ title: this.title.trim(), description: this.description, priority: this.priority });
    this.title = '';
    this.description = '';
    this.priority = 'low';
  }
}