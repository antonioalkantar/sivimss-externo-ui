import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicoComponent } from './publico.component';

const routes: Routes = [
  {
    path: '',
    component: PublicoComponent,
    children: [
      {
        path: '',
        redirectTo: 'inicio-sesion',
        pathMatch: 'full',
      },
      {
        path: 'inicio-sesion',
        loadChildren: () => import('./pages/inicio-sesion/inicio-sesion.module').then(m => m.InicioSesionModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicoRoutingModule { }
