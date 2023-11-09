import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratarConvenioPrevisionFunerariaRoutingModule } from './contratar-convenio-prevision-funeraria-routing.module';
import { ContratarConvenioPrevisionFunerariaComponent } from './contratar-convenio-prevision-funeraria.component';
import { TituloPrincipalModule } from 'src/app/shared/titulo-principal/titulo-principal.module';
import { BtnRegresarModule } from 'src/app/shared/btn-regresar/btn-regresar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [ContratarConvenioPrevisionFunerariaComponent],
  imports: [
    CommonModule,
    ContratarConvenioPrevisionFunerariaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    TituloPrincipalModule,
    BtnRegresarModule,
    TableModule,
    CheckboxModule,
    RadioButtonModule,
  ],
})
export class ContratarConvenioPrevisionFunerariaModule {}
