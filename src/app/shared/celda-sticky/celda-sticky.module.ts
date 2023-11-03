import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstilosCeldaStickyDirective } from './directives/estilos-celda-sticky.directive';
import { ActivarUltimaCeldaStickyDirective } from './directives/activar-ultima-celda-sticky.directive';

@NgModule({
  declarations: [
    ActivarUltimaCeldaStickyDirective,
    EstilosCeldaStickyDirective,
  ],
  imports: [CommonModule],
  exports: [ActivarUltimaCeldaStickyDirective, EstilosCeldaStickyDirective],
})
export class CeldaStickyModule {}
