import { Component, inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, TaskListComponent, TaskFormComponent],
  template: `
  <div class="min-h-screen">
    <app-header></app-header>
    <main class="container mt-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section class="md:col-span-2">
          <app-task-form></app-task-form>
          <app-task-list></app-task-list>
        </section>
        <aside class="md:col-span-1">
          <div class="bg-white p-4 rounded shadow">
            <h3 class="font-bold mb-2">Resumo</h3>
            <p class="text-sm text-gray-600">Total de tarefas: {{ total }}</p>
            <p class="text-sm text-gray-600">Concluídas: {{ completed }}</p>
          </div>
        </aside>
      </div>
    </main>
  </div>
  `
})
export class AppComponent {
  // kept minimal; real derived values are shown in TaskList via service
  total = '—';
  completed = '—';
}
