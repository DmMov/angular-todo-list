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
  searchedTodos: ITodo[];
  title: string = 'all todos';

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
  
  deleteTodo = (todo: ITodo): void => {
    const url = `${todosUrl}/${todo.id}`;
    this.http
      .delete(url, httpOptions)
      .toPromise()
      .then(() => this.todos = this.todos.filter(t => todo.id != t.id));
  }

  searchTodo = (searched: string) => {
    if (searched != '') {
      this.searchedTodos = this.todos.filter(todo => todo.title.includes(searched));
      this.title = 'searched todos';
    } else {
      this.searchedTodos = undefined;
      this.title = 'all todos';
    }
  }
  
}
