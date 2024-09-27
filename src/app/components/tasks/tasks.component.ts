import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  tasks = [
    {
      title: 'Tarea A',
      date: '2024-10-01',
      completed: false,
      people: [
        {
          name: 'Juan Pérez',
          age: 25,
          skills: ['JavaScript', 'Angular']
        },
        {
          name: 'María López',
          age: 30,
          skills: ['TypeScript', 'CSS']
        }
      ]
    },
    {
      title: 'Tarea B',
      date: '2024-09-25',
      completed: true,
      people: [
        {
          name: 'Carlos Gómez',
          age: 40,
          skills: ['HTML', 'SCSS']
        }
      ]
    }
  ];
}
