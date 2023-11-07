import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivadoComponent } from './privado.component';

const routes: Routes = [
  {
    path: '',
    component: PrivadoComponent,
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
      {
        path: 'inicio',
        loadChildren: () =>
          import('./pages/inicio/inicio.module').then((m) => m.InicioModule),
      },
      {
        path: 'consultar-mis-servicios-en-linea',
        loadChildren: () =>
          import('./pages/menu-servicios/menu-servicios.module').then(
            (m) => m.MenuServiciosModule
          ),
      },
      {
        path: 'consultar-mi-convenio-de-prevision-funeraria',
        loadChildren: () =>
          import(
            './pages/consulta-convenio-prevision-funeraria/consulta-convenio-prevision-funeraria.module'
          ).then((m) => m.ConsultaConvenioPrevisionFunerariaModule),
      },
      {
        path: 'consultar-plan-de-servicios-funerarios-pago-anticipado',
        loadChildren: () =>
          import(
            './pages/consulta-plan-servicios-funerarios-pago-anticipado/consulta-plan-servicios-funerarios-pago-anticipado.module'
          ).then((m) => m.ConsultaPlanServiciosFunerariosPagoAnticipadoModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivadoRoutingModule {}
