import { Component } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-search-todo',
  templateUrl: './search-todo.component.html',
  styleUrls: ['./search-todo.component.sass']
})
export class SearchTodoComponent {
  searched: string = '';
  constructor(private todoService: TodoService) { }

  onSubmit = () =>
    this.todoService.search(this.searched);
}
