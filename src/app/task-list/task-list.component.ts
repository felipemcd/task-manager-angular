import { Component, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="bg-white p-4 rounded shadow">
    <h2 class="font-bold mb-2">Tarefas</h2>

    <div *ngIf="(tasks().length === 0)" class="text-sm text-gray-600">Nenhuma tarefa.</div>

    <ul>
      <li *ngFor="let t of tasks()" class="flex items-start gap-3 py-2 border-b last:border-b-0">
        <input type="checkbox" [checked]="t.done" (change)="toggle(t.id)" />
        <div class="flex-1">
          <div class="flex justify-between">
            <div>
              <div [class.line-through]="t.done" class="font-medium">{{ t.title }}</div>
              <div class="text-xs text-gray-500">{{ t.description }}</div>
            </div>
            <div class="text-xs text-gray-400">{{ t.priority }}</div>
          </div>
        </div>
        <button (click)="remove(t.id)" class="text-red-500 ml-2">Remover</button>
      </li>
    </ul>
  </div>
  `,
  styles: [`.line-through { text-decoration: line-through; }`]
})
export class TaskListComponent {
  constructor(private taskService: TaskService) {}

  // use the signal directly - template calls tasks()
  tasks = () => this.taskService.tasks();

  toggle(id: number) { this.taskService.toggleDone(id); }
  remove(id: number) { this.taskService.remove(id); }
}
