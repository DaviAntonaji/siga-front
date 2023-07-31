import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthGuard } from './auth.guard';
import { HorariosComponent } from './components/horarios/horarios.component';
import { DisciplinasComponent } from './components/disciplinas/disciplinas.component';
import { FaltasComponent } from './components/faltas/faltas.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: SidebarComponent,

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'horarios',
        component: HorariosComponent,
      },
      {
        path: 'disciplinas',
        component: DisciplinasComponent,
      },
      {
        path: 'faltas',
        component: FaltasComponent,
      },
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
