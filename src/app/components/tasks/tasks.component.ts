import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
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
  filteredTasks: any[] = [];
  filters = ['Todas', 'Completadas', 'Pendientes'];
  activeFilter: string = 'Todas';

  ngOnInit(): void {
    this.filterTasks(this.activeFilter);
  }

  filterTasks(filter: string): void {
    let status: boolean;
    if (filter == 'Todas') {
      this.filteredTasks = this.tasks;
      return;
    }
    status = filter == 'Todas' || filter == 'Completadas' ? true : false;
    this.filteredTasks = this.tasks.filter(task => task.completed == status)
  }

  // Método para cambiar el filtro activo
  setFilter(filter: string) {
    this.activeFilter = filter;
    this.filterTasks(filter);
    console.log(filter)
  }

  // Método para cambiar el estado de una tarea
  toggleTaskStatus(task: any): void {
    task.completed = !task.completed;
  }
}
