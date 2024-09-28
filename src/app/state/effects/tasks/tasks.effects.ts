import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TasksActions from '../../actions/tasks/tasks.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { TasksService } from '../../../services/tasks.service';
import { of } from 'rxjs';

@Injectable()
export class TasksEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      mergeMap(() =>
        this.tasksService.getTasks().pipe(
          map((tasks) => TasksActions.loadTasksSuccess({ tasks })),
          catchError((error) =>
            of(TasksActions.loadTasksFailure({ error }))
          )
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.addTask),
      mergeMap(({ task }) =>
        this.tasksService.addTask(task).pipe(
          map((newTask) => TasksActions.addTaskSuccess({ task: newTask })),
          catchError((error) =>
            of(TasksActions.addTaskFailure({ error }))
          )
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      mergeMap(({ taskId }) =>
        this.tasksService.deleteTask(taskId).pipe(
          map(() => TasksActions.deleteTaskSuccess({ taskId })),
          catchError((error) =>
            of(TasksActions.deleteTaskFailure({ error }))
          )
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTask),
      mergeMap(({ task }) =>
        this.tasksService.updateTask(task).pipe(
          map((updatedTask) =>
            TasksActions.updateTaskSuccess({ task: updatedTask })
          ),
          catchError((error) =>
            of(TasksActions.updateTaskFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private tasksService: TasksService
  ) {}
}
