import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task';

/* Load tasks */
export const loadTasks = createAction('[Tasks] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{ tasks: Task[] }>()
);
export const loadTasksFailure = createAction(
  '[Tasks] Load Tasks Failure',
  props<{ error: any }>()
);

/* Add tasks */
export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ task: Task }>()
);
export const addTaskSuccess = createAction(
  '[Tasks] Add Task Success',
  props<{ task: Task }>()
);
export const addTaskFailure = createAction(
  '[Tasks] Add Task Failure',
  props<{ error: any }>()
);

/* Delete tasks */
export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ taskId: number }>()
);
export const deleteTaskSuccess = createAction(
  '[Tasks] Delete Task Success',
  props<{ taskId: number }>()
);
export const deleteTaskFailure = createAction(
  '[Tasks] Delete Task Failure',
  props<{ error: any }>()
);

/* Update Tasks */
export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ task: Task }>()
);
export const updateTaskSuccess = createAction(
  '[Tasks] Update Task Success',
  props<{ task: Task }>()
);
export const updateTaskFailure = createAction(
  '[Tasks] Update Task Failure',
  props<{ error: any }>()
);
