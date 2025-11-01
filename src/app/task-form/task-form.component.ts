import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { TaskService } from '../services/task.service';
import { Task } from '../models/task'; 

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  template: `
  <div (click)="close.emit()" class="fixed inset-0 z-40 bg-black/40"></div>

  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-auto p-6">
      
      <div class="flex items-start justify-between mb-4">
        <h3 class="text-lg font-semibold">{{ isEditing ? 'Editar tarefa' : 'Nova tarefa' }}</h3>
        <button (click)="close.emit()" class="text-slate-500 hover:text-slate-800">✕</button>
      </div>

      <form (submit)="submit($event)" class="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
        
        <div>
          <label class="text-sm text-slate-700">Título</label>
          <input [(ngModel)]="title" name="title" class="w-full mt-1 p-2 border rounded" required />
        </div>
        
        <div>
          <label class="text-sm text-slate-700">Data término</label>
          <input [(ngModel)]="due" name="due" type="date" class="w-full mt-1 p-2 border rounded" />
        </div>

        <div>
          <label class="text-sm text-slate-700">Nível</label>
          <select [(ngModel)]="priority" name="priority" class="w-full mt-1 p-2 border rounded">
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <div class="md:col-span-3">
          <label class="text-sm text-slate-700">Descrição (breve)</label>
          <textarea [(ngModel)]="description" name="desc" rows="2" class="w-full mt-1 p-2 border rounded"></textarea>
        </div>

        <div class="md:col-span-3 text-right">
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {{ isEditing ? 'Salvar' : 'Adicionar' }}
          </button>
        </div>

      </form>
    </div>
  </div>
  `
})
export class TaskFormComponent implements OnInit {
  // Estado para os campos do formulário
  title = '';
  description = '';
  priority: 'low'|'medium'|'high' = 'low';
  due = ''; // Novo campo
  isEditing = false;
  editingTaskId: string | null = null;

  // Inputs e Outputs para o modal
  @Input() taskToEdit: Task | null = null;
  @Output() close = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  // ngOnInit é chamado quando o componente é inicializado
  ngOnInit(): void {
    if (this.taskToEdit) {
      this.isEditing = true;
      this.editingTaskId = this.taskToEdit.id;
      this.title = this.taskToEdit.title;
      this.description = this.taskToEdit.description;
      this.priority = this.taskToEdit.priority;
      this.due = this.taskToEdit.due || '';
    }
  }

  submit(ev: Event) {
    ev.preventDefault();
    if (!this.title.trim()) return;

    const taskData = {
      title: this.title.trim(),
      description: this.description.trim(),
      priority: this.priority,
      due: this.due
    };

    if (this.isEditing && this.editingTaskId) {
      // Lógica de Edição
      this.taskService.update(this.editingTaskId, taskData);
    } else {
      // Lógica de Adicionar
      this.taskService.add(taskData);
    }

    this.resetAndClose();
  }

  resetAndClose() {
    this.title = '';
    this.description = '';
    this.priority = 'low';
    this.due = '';
    this.isEditing = false;
    this.editingTaskId = null;
    this.close.emit(); // Emite o evento para fechar
  }
}