import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratarConvenioPrevisionFunerariaRoutingModule } from './contratar-convenio-prevision-funeraria-routing.module';
import { ContratarConvenioPrevisionFunerariaComponent } from './contratar-convenio-prevision-funeraria.component';
import { TituloPrincipalModule } from 'src/app/shared/titulo-principal/titulo-principal.module';
import { BtnRegresarModule } from 'src/app/shared/btn-regresar/btn-regresar.module';

@NgModule({
  declarations: [ContratarConvenioPrevisionFunerariaComponent],
  imports: [
    CommonModule,
    ContratarConvenioPrevisionFunerariaRoutingModule,
    TituloPrincipalModule,
    BtnRegresarModule,
  ],
})
export class ContratarConvenioPrevisionFunerariaModule {}
