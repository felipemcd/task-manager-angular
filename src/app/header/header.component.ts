import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
  <header class="bg-white shadow">
    <div class="container flex items-center justify-between py-4">
      <h1 class="text-xl font-semibold">Gerenciador de Tarefas</h1>
      <nav>
        <button class="px-3 py-1 rounded hover:bg-gray-100">Home</button>
        <button class="px-3 py-1 rounded hover:bg-gray-100">Sobre</button>
      </nav>
    </div>
  </header>
  `
})
export class HeaderComponent {}
