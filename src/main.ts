import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { TaskService } from './app/services/task.service'; 
import { provideRouter } from '@angular/router'; 

bootstrapApplication(AppComponent, {
  providers: [
    TaskService, 
    provideRouter([]), 
  ]
}).catch(err => console.error(err));