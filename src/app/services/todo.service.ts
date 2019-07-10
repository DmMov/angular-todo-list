import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITodo } from '../models/ITodo';
import { Observable } from 'rxjs';
import { todosUrl, todosLimitOption } from 'src/assets/urls';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json' 
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: ITodo[];

  constructor(private http: HttpClient) { }

  getTodos = (): void => {
    this.http
      .get<ITodo[]>(todosUrl + todosLimitOption)
      .toPromise()
      .then(res => this.todos = res);
  }

  toggleCompleted = (todo: ITodo): void => {
    const url = `${todosUrl}/${todo.id}`;
    this.http
      .put(url, todo, httpOptions)
      .toPromise()
      .then((todo: ITodo) => {
        this.todos = this.todos.map(t => {
          return t.id == todo.id ? todo : t;
        });
      })
  }

  addTodo = async (todo: any): Promise<boolean> => {
    let result: boolean = false;
    await this.http
      .post<ITodo>(todosUrl, todo, httpOptions)
      .toPromise()
      .then(newTodo => {
        this.todos = [...this.todos, newTodo];
        result = true;
      });
    return result;
  }
  
  deleteTodo = (todo: ITodo): Observable<ITodo> => {
    const url = `${todosUrl}/${todo.id}`;
    return this.http.delete<ITodo>(url, httpOptions);
  }
}
