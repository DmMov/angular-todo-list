import { Component, Output, EventEmitter } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.sass']
})
export class AddTodoComponent {
  title: string;
  constructor(private todoService: TodoService) {}
  
  onSubmit = () => {
    if (this.title !== '' && typeof(this.title) !== 'undefined') {
      const todo: any = {
        title: this.title,
        completed: false
      }
      this.title = this.todoService.addTodo(todo) && '';
    }
  }
  
}
