import { Component, Input, computed, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let task of filteredTasks()" 
         class="p-3 border rounded bg-white shadow-sm"
         [ngClass]="getPriorityBorder(task.priority)">
        
      <div class="flex items-start justify-between gap-2">
        <div class="flex items-center gap-3">
          <span 
            class="dot w-3.5 h-3.5 rounded-full inline-block" 
            [ngClass]="getProximityColor(task.due)"
            [title]="getProximityTitle(task.due)">
          </span>
          
          <div>
            <div class="font-semibold text-slate-800">{{ task.title }}</div>
            <div class="text-xs text-slate-500">
              Término: {{ task.due || 'N/A' }} • Nível: {{ levelLabel(task.priority) }}
            </div>
          </div>
        </div>
        
        <div class="text-right flex-shrink-0">
          <button (click)="edit(task)" class="text-xs text-slate-500 mr-2">Editar</button>
          <button (click)="remove(task.id)" class="text-xs text-red-500">Excluir</button>
        </div>
      </div>
      
      <p class="mt-2 text-sm text-slate-600">{{ task.description }}</p>

      <div class="task-actions mt-3">
        <button *ngIf="task.status === 'todo'" class="bg-blue-600" (click)="updateStatus(task.id, 'doing')">Em Andamento</button>
        
        <button *ngIf="task.status === 'doing'" class="bg-yellow-600" (click)="updateStatus(task.id, 'todo')">Para Fazer</button>
        <button *ngIf="task.status === 'doing'" class="bg-green-600" (click)="updateStatus(task.id, 'done')">Concluir</button>
        
        <button *ngIf="task.status === 'done'" class="bg-yellow-600" (click)="updateStatus(task.id, 'doing')">Em Andamento</button>
      </div>
    </div>
    
    <p *ngIf="filteredTasks().length === 0" class="text-sm text-slate-500 mt-2">Nenhuma tarefa nesta coluna.</p>
  `,
})
export class TaskListComponent {
  @Input({ required: true }) status!: 'todo' | 'doing' | 'done';
  @Output() startEdit = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  filteredTasks = computed(() => {
    return this.taskService.tasks().filter(task => task.status === this.status);
  });

  updateStatus(id: string, newStatus: 'todo' | 'doing' | 'done'): void {
    this.taskService.updateStatus(id, newStatus);
  }

  remove(id: string): void {
    this.taskService.remove(id);
  }

  edit(task: Task): void {
    this.startEdit.emit(task);
  }

  levelLabel(level: 'low' | 'medium' | 'high'): string {
    if (level === 'high') return 'Alta';
    if (level === 'medium') return 'Média';
    return 'Baixa';
  }

  getPriorityBorder(priority: 'low' | 'medium' | 'high'): string {
    if (priority === 'high') return 'border-l-4 border-red-500';
    if (priority === 'medium') return 'border-l-4 border-yellow-500';
    return 'border-l-4 border-green-500';
  }

  getProximityColor(dueISO?: string): string {
    if (!dueISO) return 'bg-gray-300';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueISO + 'T00:00:00-03:00');

    const diffTime = due.getTime() - today.getTime();
    const diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diff < 0) return 'bg-gray-500';
    if (diff <= 1) return 'bg-red-500';
    if (diff <= 3) return 'bg-orange-400';
    if (diff <= 7) return 'bg-yellow-400';
    return 'bg-green-400';
  }

  getProximityTitle(dueISO?: string): string {
    if (!dueISO) return 'Sem data definida';
    return 'Proximidade da data de término';
  }
}