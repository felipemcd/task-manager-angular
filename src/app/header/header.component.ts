// src/app/header/header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  // Template atualizado para bater com o index.html original
  template: `
    <header class="mb-6 mt-4">
      <h1 class="text-3xl font-bold text-slate-800">Gerenciador de Tarefas - Estudos</h1>
      <p class="text-slate-600 mt-1 text-sm">Cards em 3 colunas: Para Fazer, Em Andamento e Concluídas.</p>
    </header>
  `,
})
export class HeaderComponent { }