import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let task of filteredTasks()" 
         class="task-card" 
         [ngClass]="'priority-' + task.priority">
        
      <label class="flex items-center gap-2 mb-2">
        <input type="checkbox" [checked]="task.status === 'done'" (change)="toggleDone(task.id)">
        <span class="font-semibold" [class.line-through]="task.status === 'done'">{{ task.title }}</span>
      </label>
      
      <p class="text-sm text-slate-700">{{ task.description }}</p>
      <p class="text-sm text-slate-500 mt-1">Nível: {{ task.priority }}</p>

      <div class="task-actions">
        <button *ngIf="task.status === 'todo'" class="bg-blue-600" (click)="updateStatus(task.id, 'doing')">Em Andamento</button>
        <button *ngIf="task.status === 'doing'" class="bg-yellow-600" (click)="updateStatus(task.id, 'todo')">Voltar</button>

        <button class="remove" (click)="remove(task.id)">Excluir</button>
      </div>
    </div>
    
    <p *ngIf="filteredTasks().length === 0" class="text-sm text-slate-500 mt-2">Nenhuma tarefa nesta coluna.</p>
  `,
})
export class TaskListComponent {
  @Input({ required: true }) status!: 'todo' | 'doing' | 'done';

  constructor(private taskService: TaskService) {}

  filteredTasks = computed(() => {
    return this.taskService.tasks().filter(task => task.status === this.status);
  });

  updateStatus(id: string, newStatus: 'todo' | 'doing' | 'done'): void {
    this.taskService.updateStatus(id, newStatus);
  }

  toggleDone(id: string): void {
    this.taskService.toggleStatus(id);
  }

  remove(id: string): void {
    this.taskService.remove(id);
  }
}