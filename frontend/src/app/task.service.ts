import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardShape, Task } from './shared/types';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/tasks';
  
  createTask(taskData: {title: string; description?: string; column?: string }): Observable<Task>{
    return this.httpClient.post<Task>(`${this.apiUrl}`, taskData);
  }

  deleteTask(taskData: {id: string}): Observable<unknown>{
    return this.httpClient.delete<Task>(`${this.apiUrl}/${taskData.id}/delete`);
  }

  moveTask(id: string, column: keyof BoardShape): Observable<Task>{
    return this.httpClient.patch<Task>(`${this.apiUrl}/${id}/move`, {column});
  }

  updateTask(taskData: {id: string; title?: string; descrition?: string}): Observable<Task>{
    return this.httpClient.patch<Task>(`${this.apiUrl}/${taskData.id}/update`, taskData);
  }
}
