import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { ITodo } from '../models/ITodo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: '[app-todo]',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass']
})
export class TodoComponent implements OnInit {
  @Input() todo: ITodo;
  @Output() deleteTodo: EventEmitter<ITodo> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  onToggle = (todo: ITodo) => {
    todo.completed = !todo.completed;
    this.todoService.toggleCompleted(todo).subscribe(t => this.todo.completed = t.completed)
  }
  
  onDelete = (todo: ITodo) => {
    this.deleteTodo.emit(todo);
  }
}
