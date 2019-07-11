import { Component, OnInit, Input } from '@angular/core';
import { ITodo } from '../../models/ITodo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: '[app-todo]',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass']
})
export class TodoComponent implements OnInit {
  @Input() todo: ITodo;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  onToggle = (todo: ITodo) => {
    todo.completed = !todo.completed;
    this.todoService.toggleCompleted(todo);
  }
  
  onDelete = (todo: ITodo) => {
    this.todoService.deleteTodo(todo);
  }
}
