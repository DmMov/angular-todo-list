import { Component, OnInit } from '@angular/core';
import { ITodo } from '../../models/ITodo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.sass']
})
export class TodosComponent implements OnInit {
  constructor(private todoService: TodoService) { }
  
  ngOnInit() {
    this.todoService.getTodos();
  }
}