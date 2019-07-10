import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITodo } from '../models/ITodo';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json' 
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit: string = '?_limit=5'

  constructor(private http: HttpClient) { }

  getTodos = (): Observable<ITodo[]> => {
    return this.http.get<ITodo[]>(this.todosUrl + this.todosLimit)
  }

  toggleCompleted = (todo: ITodo): Observable<any> => {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }
  
  
}
