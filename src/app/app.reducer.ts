import { ActionReducerMap } from '@ngrx/store';
import { filtrosValidos } from './filtro/filtro.action';
import { filtroReducer } from './filtro/filtro.reducer';
import { Todo } from './todos/models/todo.models';
import { todoReducer } from './todos/todo.reduce';

export interface AppState {
    todos: Todo[],
    filtro: filtrosValidos
}

export const appReducers: ActionReducerMap<AppState> = {
    todos: todoReducer,
    filtro: filtroReducer
}