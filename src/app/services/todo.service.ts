import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit: string = '?_limit=25'

  constructor(private http: HttpClient) { }

  getTodos = (): Observable<Todo[]> => {
    return this.http.get<Todo[]>(this.todosUrl + this.todosLimit)
  }
  
}
