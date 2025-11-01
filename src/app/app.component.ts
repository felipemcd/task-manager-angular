import { Component, computed, signal } from '@angular/core'; // Adiciona 'signal'
import { CommonModule } from '@angular/common';

// Componentes da Aplicação
import { HeaderComponent } from './header/header.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskService } from './services/task.service';
import { Task } from './models/task'; // Importa o modelo Task

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    TaskFormComponent,
    TaskListComponent
  ],
  template: `
    <div>
      <app-header></app-header>
      
      <div class="mb-6 flex items-center justify-between">
        <div>
          <p class="text-slate-600">Adicione novas tarefas pelo botão <span class="font-semibold">+</span>.</p>
        </div>
        <div>
          <button (click)="openFormModal(null)" aria-label="Adicionar tarefa" class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl hover:bg-blue-700">+</button>
        </div>
      </div>

      <app-task-form 
        *ngIf="isFormOpen()" 
        [taskToEdit]="editingTask()"
        (close)="closeFormModal()">
      </app-task-form>

      <main class="main-grid">
        <section>
          <h2>Para fazer</h2>
          <div class="task-column">
            <app-task-list status="todo" (startEdit)="openFormModal($event)"></app-task-list>
          </div>
        </section>
        
        <section>
          <h2>Em andamento</h2>
          <div class="task-column">
            <app-task-list status="doing" (startEdit)="openFormModal($event)"></app-task-list>
          </div>
        </section>
        
        <section>
          <h2>Concluídas</h2>
          <div class="task-column">
            <app-task-list status="done" (startEdit)="openFormModal($event)"></app-task-list>
          </div>
        </section>
      </main>
      
      <aside class="main-grid mt-4 task-column">
        <h2 class="text-xl font-semibold mb-2">Resumo</h2>
        <p class="text-slate-700">Total de tarefas: {{ totalTasks() }}</p>
        <p class="text-slate-700">Concluídas: {{ doneTasks() }}</p>
      </aside>
    </div>
  `,
})
export class AppComponent {
  title = 'task-manager-angular';

  // Signals para controlar o estado do modal e edição
  isFormOpen = signal(false);
  editingTask = signal<Task | null>(null);

  constructor(private taskService: TaskService) {}

  totalTasks = computed(() => this.taskService.tasks().length);
  doneTasks = computed(() => this.taskService.tasks().filter(t => t.status === 'done').length);

  // Métodos para controlar o modal
  openFormModal(task: Task | null) {
    this.editingTask.set(task); // Define a tarefa a ser editada (ou null para nova)
    this.isFormOpen.set(true);
  }

  closeFormModal() {
    this.isFormOpen.set(false);
    this.editingTask.set(null);
  }
}