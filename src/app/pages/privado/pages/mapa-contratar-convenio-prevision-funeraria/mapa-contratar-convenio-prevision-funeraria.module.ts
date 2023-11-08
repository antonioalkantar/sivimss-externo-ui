import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TituloPrincipalModule } from 'src/app/shared/titulo-principal/titulo-principal.module';
import { BtnRegresarModule } from 'src/app/shared/btn-regresar/btn-regresar.module';
import { MapaContratarConvenioPrevisionFunerariaRoutingModule } from './mapa-contratar-convenio-prevision-funeraria-routing.module';
import { MapaContratarConvenioPrevisionFunerariaComponent } from './mapa-contratar-convenio-prevision-funeraria.component';

@NgModule({
  declarations: [MapaContratarConvenioPrevisionFunerariaComponent],
  imports: [
    CommonModule,
    MapaContratarConvenioPrevisionFunerariaRoutingModule,
    TituloPrincipalModule,
    BtnRegresarModule,
  ],
})
export class MapaContratarConvenioPrevisionFunerariaModule {}
