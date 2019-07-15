import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITodo } from '../models/ITodo';
import { todosUrl } from 'src/assets/urls';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
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
      .get(todosUrl, { observe: 'response' })
      .subscribe(response => this.todos = response.body['todos']);
  }

  toggleCompleted = (todo: ITodo): void => {
    const url = `${todosUrl}/${todo.id}`;
    this.http
      .put<{ todo: ITodo }>(url, todo, httpOptions)
      .subscribe(res => this.todos = this.todos.map(t => t.id == res.todo.id ? res.todo : t))
  }

  addTodo = async (title: string): Promise<boolean> => {
    let result: boolean = false;
    await this.http
      .post<{ todo: ITodo }>(todosUrl, { title }, httpOptions)
      .subscribe(res => {
        this.todos = [...this.todos, res.todo];
        result = true;
      });
    return result;
  }
  
  deleteTodo = (todo: ITodo): void => {
    const url = `${todosUrl}/${todo.id}`;
    this.http
      .delete(url, httpOptions)
      .subscribe(() => this.todos = this.todos.filter(t => todo.id != t.id));
  }

  search = (searched: string) => {
    if (searched != '') {
      this.http
        .get(`${todosUrl}search/${searched}`, { observe: 'response' })
        .subscribe(response => {
          if(response.status == 200) {
            this.title = 'searched todos';
            this.searchedTodos = response.body['todos'];
          }
          else if(response.status == 204)
            this.searchedTodos = []
        });
    } else {
      this.searchedTodos = undefined;
      this.title = 'all todos';
    }
  }
  
}
