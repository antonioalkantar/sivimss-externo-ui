import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaConvenioPrevisionFunerariaComponent } from './consulta-convenio-prevision-funeraria.component';

describe('ConsultaConvenioPrevisionFunerariaComponent', () => {
  let component: ConsultaConvenioPrevisionFunerariaComponent;
  let fixture: ComponentFixture<ConsultaConvenioPrevisionFunerariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaConvenioPrevisionFunerariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaConvenioPrevisionFunerariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
