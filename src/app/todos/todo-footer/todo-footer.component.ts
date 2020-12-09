import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as action from 'src/app/filtro/filtro.action';
import { limpiarTodos } from '../todo.action';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: action.filtrosValidos = 'todos';

  filtros: action.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  pendientes: number = 0
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.store.select('filtro').subscribe(filtro =>
    //   this.filtroActual = filtro
    // );

    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
    });
  }

  cambiarFiltro(filtro: action.filtrosValidos) {
    this.store.dispatch(action.setFiltro({ filtro: filtro }));
  }

  limpiarCompletados() {
    this.store.dispatch(limpiarTodos());
  }
}
