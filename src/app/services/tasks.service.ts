import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Tarea A',
      date: '2024-10-01',
      completed: false,
      people: [
        {
          name: 'Juan Pérez',
          age: 25,
          skills: ['JavaScript', 'Angular'],
        },
        {
          name: 'María López',
          age: 30,
          skills: ['TypeScript', 'CSS'],
        },
      ],
    },
    {
      id: 2,
      title: 'Tarea B',
      date: '2024-09-25',
      completed: true,
      people: [
        {
          name: 'Carlos Gómez',
          age: 40,
          skills: ['HTML', 'SCSS'],
        },
      ],
    },
  ];

  private currentId = 3;

  constructor() {}

  // Simular obtener las tareas
  getTasks(): Observable<Task[]> {
    return of(this.tasks).pipe(delay(500)); // Simula una llamada asíncrona
  }

  // Simular agregar una tarea
  addTask(task: Task): Observable<Task> {
    const newTask = { ...task, id: this.currentId++ };
    // Crear un nuevo array en lugar de modificar el existente
    this.tasks = [...this.tasks, newTask];
    return of(newTask).pipe(delay(500));
  }

  // Simular eliminar una tarea
  deleteTask(taskId: number): Observable<number> {
    // Crear un nuevo array sin la tarea eliminada
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    return of(taskId).pipe(delay(500));
  }

  // Simular actualizar una tarea
  updateTask(updatedTask: Task): Observable<Task> {
    // Crear un nuevo array de tareas con la tarea actualizada
    this.tasks = this.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    return of(updatedTask).pipe(delay(500));
  }
}
