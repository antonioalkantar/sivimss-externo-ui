import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiConvenioPrevisionFunerariaComponent } from './mi-convenio-prevision-funeraria.component';

describe('MiConvenioPrevisionFunerariaComponent', () => {
  let component: MiConvenioPrevisionFunerariaComponent;
  let fixture: ComponentFixture<MiConvenioPrevisionFunerariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiConvenioPrevisionFunerariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiConvenioPrevisionFunerariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
