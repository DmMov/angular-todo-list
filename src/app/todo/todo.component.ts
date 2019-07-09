import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: '[app-todo]',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass']
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;
  constructor() { }

  ngOnInit() {
  }

  onToggle = (todo: Todo) => {
    todo.completed = !todo.completed
  }
  
  onDelete = (todo: Todo) => {
    console.log('delete');
  }
}
