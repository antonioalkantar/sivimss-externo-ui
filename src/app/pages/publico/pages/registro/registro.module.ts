import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { TituloPrincipalModule } from 'src/app/shared/titulo-principal/titulo-principal.module';


@NgModule({
  declarations: [
    RegistroComponent
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    TituloPrincipalModule
  ]
})
export class RegistroModule { }
