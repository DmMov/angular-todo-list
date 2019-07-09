import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITodo } from '../models/ITodo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit: string = '?_limit=10'

  constructor(private http: HttpClient) { }

  getTodos = (): Observable<ITodo[]> => {
    return this.http.get<ITodo[]>(this.todosUrl + this.todosLimit)
  }
  
}
