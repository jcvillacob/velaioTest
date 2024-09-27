import { Component } from '@angular/core';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  modal: boolean = false;

  createTask() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }
}
