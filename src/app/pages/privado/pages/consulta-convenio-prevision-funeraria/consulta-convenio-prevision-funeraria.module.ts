import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaConvenioPrevisionFunerariaRoutingModule } from './consulta-convenio-prevision-funeraria-routing.module';
import { ConsultaConvenioPrevisionFunerariaComponent } from './consulta-convenio-prevision-funeraria.component';
import { TituloPrincipalModule } from 'src/app/shared/titulo-principal/titulo-principal.module';
import { BtnRegresarModule } from 'src/app/shared/btn-regresar/btn-regresar.module';
import { TableModule } from 'primeng/table';
import { CeldaStickyModule } from 'src/app/shared/celda-sticky/celda-sticky.module';

@NgModule({
  declarations: [ConsultaConvenioPrevisionFunerariaComponent],
  imports: [
    CommonModule,
    ConsultaConvenioPrevisionFunerariaRoutingModule,
    TituloPrincipalModule,
    BtnRegresarModule,
    TableModule,
    CeldaStickyModule
  ],
})
export class ConsultaConvenioPrevisionFunerariaModule {}
