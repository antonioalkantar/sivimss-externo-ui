import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'publico',
    pathMatch: 'full',
  },
  { path: 'publico', loadChildren: () => import('./pages/publico/publico.module').then(m => m.PublicoModule) },
  { path: 'privado', loadChildren: () => import('./pages/privado/privado.module').then(m => m.PrivadoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    paramsInheritanceStrategy: 'always',
    relativeLinkResolution: 'corrected',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
