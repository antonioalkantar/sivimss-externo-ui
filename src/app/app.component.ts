import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.permitirAnimacionRippleComponentesPrime();
    this.establecerIdiomaGeneral('es');
  }

  ngAfterViewInit(): void {
    this.establecerIdiomaComponentesPrime('es');
  }

  establecerIdiomaGeneral(idiomaGeneral: string) {
    this.translateService.setDefaultLang(idiomaGeneral);
  }

  permitirAnimacionRippleComponentesPrime() {
    this.primengConfig.ripple = true;
  }

  establecerIdiomaComponentesPrime(idioma: string) {
    this.translateService.use(idioma);
    this.translateService
      .get('primeng')
      .subscribe((res) => this.primengConfig.setTranslation(res));
  }
}
