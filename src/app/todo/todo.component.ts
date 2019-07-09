import { Component, OnInit, Input } from '@angular/core';
import { ITodo } from '../models/ITodo';

@Component({
  selector: '[app-todo]',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass']
})
export class TodoComponent implements OnInit {
  @Input() todo: ITodo;
  constructor() { }

  ngOnInit() {
  }

  onToggle = (todo: ITodo) => {
    todo.completed = !todo.completed
  }
  
  onDelete = (todo: ITodo) => {
    console.log('delete');
  }
}
