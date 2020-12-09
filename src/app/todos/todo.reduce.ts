import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.models';
import { borrar, crear, editar, limpiarTodos, toggle, toggleAll } from './todo.action';

export const estadoInicial: Todo[] = [] = [
    new Todo('Salvar al mundo'),
    new Todo('Vencer a thanos'),
    new Todo('Robar escudao capitan america')
];

const _todoReducer = createReducer(
    estadoInicial,
    on(crear, (state, { texto }) => [...state, new Todo(texto)]),
    on(toggle, (state, { id }) => {
        return state.map(todo => {
            if (todo.id === id)
                return {
                    ...todo,
                    completado: !todo.completado
                };
            else
                return todo;
        });
    }),
    on(editar, (state, { id, texto }) => {
        return state.map(todo => {
            if (todo.id === id)
                return {
                    ...todo,
                    texto: texto
                };
            else
                return todo;
        });
    }),
    on(borrar, (state, { id }) => state.filter(todo => todo.id !== id)),
    on(toggleAll, (state, { completado }) =>
        state.map(todo => {
            return {
                ...todo,
                completado: completado
            };
        })
    ),
    on(limpiarTodos, (state) => state.filter(todo => !todo.completado)),
);

export function todoReducer(state, action) {
    return _todoReducer(state, action);
}