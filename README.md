# 🚀 Gerenciador de Tarefas Angular (Migração e Refatoração)

Este projeto representa a migração da aplicação estática `app-task-manager` (HTML/JS) para uma moderna Single Page Application (SPA) desenvolvida com **Angular**.

O projeto foi construído para atender aos requisitos de uso das arquiteturas mais recentes do framework.

## ✨ Requisitos Arquiteturais Atendidos

| Recurso Angular | Descrição | Status |
| :--- | :--- | :--- |
| **Componentes Standalone** | Utilização de componentes sem a necessidade de `NgModule`. | ✅ Implementado |
| **Gerenciamento de Estado (Signals)** | Uso da API `signal()` para armazenar e reagir às mudanças de estado das tarefas. | ✅ Implementado |
| **Serviço Centralizado** | Criação de um `TaskService` para encapsular a base de dados inicial. | ✅ Implementado |
| **Injeção de Dependência (DI)** | O `TaskService` é injetado nos componentes (`TaskListComponent`) via construtor. | ✅ Implementado |
| **Estilização** | Utilização de classes **Tailwind CSS** (simuladas via CSS puro para garantia de visualização em todos os ambientes). | ✅ Implementado |
| **Estrutura** | Componentes separados para `Header`, `Form` e `Lista`. | ✅ Implementado |

## 📦 Estrutura do Projeto

O projeto é modularizado nos seguintes componentes (standalone):

* `src/app/header/header.component.ts`: Exibe o título e a descrição.
* `src/app/task-form/task-form.component.ts`: Contém o formulário para adicionar novas tarefas.
* `src/app/task-list/task-list.component.ts`: Exibe as tarefas filtradas nas colunas (**Para fazer**, **Em andamento**, **Concluídas**).
* `src/app/services/task.service.ts`: Serviço que contém o Signal para o estado das tarefas e a lógica de atualização.

## ⚙️ Funcionalidades e Interações

O gerenciador de tarefas permite:

1.  **Criação de Tarefas:** Adiciona uma nova tarefa com título, descrição e nível de prioridade.
2.  **Transição de Status (Botões):**
    * Tarefas em **'Para Fazer'** possuem o botão **"Em Andamento"**.
    * Tarefas em **'Em Andamento'** possuem o botão **"Voltar"** para 'Para Fazer'.
3.  **Conclusão (Checkbox):** O checkbox move a tarefa para 'Concluídas'.
4.  **Remoção:** O botão "Excluir" remove a tarefa do Signal.
5.  **Visual Organizado:** O CSS aplicado replica o layout de 3 colunas da aplicação estática original.

## 💻 Como Executar o Projeto Localmente

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/task-manager-angular.git](https://github.com/SEU_USUARIO/task-manager-angular.git)
    cd task-manager-angular
    ```
2.  **Instale as Dependências:**
    ```bash
    npm install
    ```
