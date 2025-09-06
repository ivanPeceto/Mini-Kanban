import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './shared/types';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';
  
  createTask(taskData: {title: string; description?: string }): Observable<Task>{
    return this.httpClient.post<Task>(`${this.apiUrl}/tasks`, taskData);
  }
}
