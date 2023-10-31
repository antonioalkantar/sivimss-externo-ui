import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioSesionRoutingModule } from './inicio-sesion-routing.module';
import { InicioSesionComponent } from './inicio-sesion.component';
import { DialogModule } from "primeng/dialog";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InicioSesionComponent
  ],
  imports: [
    CommonModule,
    InicioSesionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule
  ]
})
export class InicioSesionModule { }
