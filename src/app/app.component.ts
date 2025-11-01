import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes da Aplicação
import { HeaderComponent } from './header/header.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskService } from './services/task.service';

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
      
      <app-task-form></app-task-form>

      <main class="main-grid">
        
<section>
          <h2>Para fazer</h2>
          <div class="task-column">
            <app-task-list status="todo"></app-task-list>
          </div>
        </section>

        
<section>
          <h2>Em andamento</h2>
          <div class="task-column">
            <app-task-list status="doing"></app-task-list>
          </div>
        </section>

        
<section>
          <h2>Concluídas</h2>
          <div class="task-column">
            <app-task-list status="done"></app-task-list>
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

  constructor(private taskService: TaskService) {}

  // Computed signals para derivar valores a partir do TaskService.tasks
  totalTasks = computed(() => this.taskService.tasks().length);
  doneTasks = computed(() => this.taskService.tasks().filter(t => t.status === 'done').length);
}