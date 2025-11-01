// src/app/header/header.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="mb-6 mt-4">
      <h1 class="text-3xl font-bold text-slate-800">Gerenciador de Tarefas</h1>
      <p class="text-slate-600 mt-1 text-sm">Organize suas tarefas em três categorias: Para Fazer, Em Andamento e Concluídas.</p>
    </header>
  `,

})
export class HeaderComponent {
  // Você pode adicionar um título ou outras propriedades aqui, se necessário.
}