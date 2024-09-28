import { createReducer, on } from '@ngrx/store';
import { Task } from '../../../models/task';
import * as TasksActions from '../../actions/tasks/tasks.actions';

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: any;
}

export const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const tasksReducer = createReducer(
  initialState,
  on(TasksActions.loadTasks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TasksActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    loading: false,
    tasks: tasks,
  })),
  on(TasksActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(TasksActions.addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(TasksActions.deleteTaskSuccess, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== taskId),
  })),
  on(TasksActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
  })),  
  on(TasksActions.addTaskFailure, TasksActions.deleteTaskFailure, TasksActions.updateTaskFailure, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
