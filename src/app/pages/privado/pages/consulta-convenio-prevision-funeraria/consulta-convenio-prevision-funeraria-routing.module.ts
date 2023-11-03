import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaConvenioPrevisionFunerariaComponent } from './consulta-convenio-prevision-funeraria.component';

const routes: Routes = [{ path: '', component: ConsultaConvenioPrevisionFunerariaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaConvenioPrevisionFunerariaRoutingModule { }
