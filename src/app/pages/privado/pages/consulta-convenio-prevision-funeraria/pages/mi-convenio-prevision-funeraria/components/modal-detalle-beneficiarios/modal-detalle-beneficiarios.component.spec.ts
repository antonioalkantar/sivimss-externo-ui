import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleBeneficiariosComponent } from './modal-detalle-beneficiarios.component';

describe('ModalDetalleBeneficiariosComponent', () => {
  let component: ModalDetalleBeneficiariosComponent;
  let fixture: ComponentFixture<ModalDetalleBeneficiariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetalleBeneficiariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetalleBeneficiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
