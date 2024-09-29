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
      title: 'Desarrollar módulo de autenticación',
      date: '2024-10-05',
      completed: false,
      people: [
        {
          name: 'Sofía Martínez',
          age: 28,
          skills: ['JavaScript', 'Node.js', 'MongoDB'],
        },
        {
          name: 'Andrés Torres',
          age: 32,
          skills: ['React', 'Redux', 'CSS'],
        },
      ],
    },
    {
      id: 2,
      title: 'Crear documentación del proyecto',
      date: '2024-09-30',
      completed: true,
      people: [
        {
          name: 'Lucía Ramírez',
          age: 35,
          skills: ['Markdown', 'Technical Writing'],
        },
      ],
    },
    {
      id: 3,
      title: 'Realizar pruebas de integración',
      date: '2024-10-10',
      completed: false,
      people: [
        {
          name: 'Diego Salazar',
          age: 29,
          skills: ['Selenium', 'JUnit', 'Testing'],
        },
        {
          name: 'Carla Fernández',
          age: 27,
          skills: ['Postman', 'API Testing'],
        },
      ],
    },
  ];
  private currentId = 4;

  constructor() {}

  // Obtener las tareas
  getTasks(): Observable<Task[]> {
    return of(this.tasks).pipe(delay(500));
  }

  // Agregar una tarea
  addTask(task: Task): Observable<Task> {
    const newTask = { ...task, id: this.currentId++ };
    this.tasks = [...this.tasks, newTask];
    return of(newTask).pipe(delay(500));
  }

  // Eliminar una tarea
  deleteTask(taskId: number): Observable<number> {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    return of(taskId).pipe(delay(500));
  }

  // Actualizar una tarea
  updateTask(updatedTask: Task): Observable<Task> {
    this.tasks = this.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    return of(updatedTask).pipe(delay(500));
  }
}
