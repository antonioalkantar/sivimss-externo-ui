import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaPlanServiciosFunerariosPagoAnticipadoComponent } from './consulta-plan-servicios-funerarios-pago-anticipado.component';

const routes: Routes = [{ path: '', component: ConsultaPlanServiciosFunerariosPagoAnticipadoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaPlanServiciosFunerariosPagoAnticipadoRoutingModule { }
