import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { Task } from '../models/task';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return tasks', fakeAsync(() => {
    let tasks: Task[] | undefined;
    service.getTasks().subscribe((result) => {
      tasks = result;
    });
    tick(500);

    expect(tasks).toBeDefined();
    expect(tasks?.length).toBe(2);
  }));

  it('should add a task', fakeAsync(() => {
    const newTask: Task = {
      id: 0,
      title: 'Tarea C',
      date: '2024-10-10',
      completed: false,
      people: [],
    };

    let addedTask: Task | undefined;
    service.addTask(newTask).subscribe((result) => {
      addedTask = result;
    });
    tick(500);

    expect(addedTask).toBeDefined();
    expect(addedTask?.id).toBe(3);
    expect(addedTask?.title).toBe('Tarea C');

    let tasks: Task[] | undefined;
    service.getTasks().subscribe((result) => {
      tasks = result;
    });
    tick(500);
    expect(tasks?.length).toBe(3);
    expect(tasks?.some((task) => task.id === 3)).toBeTrue();
  }));

  it('should delete a task', fakeAsync(() => {
    let deletedTaskId: number | undefined;
    service.deleteTask(1).subscribe((result) => {
      deletedTaskId = result;
    });
    tick(500);

    expect(deletedTaskId).toBe(1);

    let tasks: Task[] | undefined;
    service.getTasks().subscribe((result) => {
      tasks = result;
    });
    tick(500);
    expect(tasks?.length).toBe(1);
    expect(tasks?.some((task) => task.id === 1)).toBeFalse();
  }));

  it('should update a task', fakeAsync(() => {
    const updatedTask: Task = {
      id: 2,
      title: 'Tarea B Actualizada',
      date: '2024-09-30',
      completed: false,
      people: [],
    };

    let resultTask: Task | undefined;
    service.updateTask(updatedTask).subscribe((result) => {
      resultTask = result;
    });
    tick(500);

    expect(resultTask).toBeDefined();
    expect(resultTask?.title).toBe('Tarea B Actualizada');

    let tasks: Task[] | undefined;
    service.getTasks().subscribe((result) => {
      tasks = result;
    });
    tick(500);
    const task = tasks?.find((t) => t.id === 2);
    expect(task).toBeDefined();
    expect(task?.title).toBe('Tarea B Actualizada');
  }));
});
