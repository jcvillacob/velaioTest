import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromTasks from '../../state/reducers/tasks.reducer';
import * as TasksActions from '../../state/actions/tasks.actions';
import { Task } from '../../models/task';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Task[]>;
  filteredTasks$!: Observable<Task[]>;
  filters = ['Todas', 'Completadas', 'Pendientes'];

  activeFilter$ = new BehaviorSubject<string>('Todas');
  counts$!: Observable<{ [key: string]: number }>;
  filtersWithCounts$!: Observable<{ label: string; count: number }[]>;

  constructor(private store: Store<{ tasks: fromTasks.TasksState }>) {
    this.tasks$ = this.store.pipe(select((state) => state.tasks.tasks));
  }

  ngOnInit(): void {
    this.store.dispatch(TasksActions.loadTasks());

    this.counts$ = this.tasks$.pipe(
      map((tasks) => {
        const total = tasks.length;
        const completed = tasks.filter((task) => task.completed).length;
        const pending = tasks.filter((task) => !task.completed).length;

        return {
          Todas: total,
          Completadas: completed,
          Pendientes: pending,
        };
      })
    );

    this.filtersWithCounts$ = this.counts$.pipe(
      map((counts) =>
        this.filters.map((label) => ({
          label,
          count: counts[label],
        }))
      )
    );

    this.filteredTasks$ = combineLatest([this.tasks$, this.activeFilter$]).pipe(
      map(([tasks, activeFilter]) => {
        if (activeFilter === 'Todas') {
          return tasks;
        } else {
          const status = activeFilter === 'Completadas';
          return tasks.filter((task) => task.completed === status);
        }
      })
    );
  }

  setFilter(filterLabel: string) {
    this.activeFilter$.next(filterLabel);
  }

  toggleTaskStatus(task: Task): void {
    const updatedTask = { ...task, completed: !task.completed };
    this.store.dispatch(TasksActions.updateTask({ task: updatedTask }));
  }

  deleteTask(taskId: number): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: 'Se eliminará la tarea de manera permanente',
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(TasksActions.deleteTask({ taskId }));
        Swal.fire("Eliminada!", "", "success");
      }
    });
  }

  newTask(task: Task) {
    this.store.dispatch(TasksActions.addTask({ task }));
  }
}
