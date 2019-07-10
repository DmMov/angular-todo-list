import { Component, OnInit } from '@angular/core';
import { ITodo } from '../models/ITodo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.sass']
})
export class TodosComponent implements OnInit {
  todos: ITodo[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo = (todo: ITodo) => {
    this.todoService.deleteTodo(todo).subscribe(() => this.todos = this.todos.filter(t => t.id != todo.id));
  }
  
}