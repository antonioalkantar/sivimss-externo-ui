import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {

  form!: FormGroup;

  usuarioIncorrecto: boolean = false;
  contraseniaIncorrecta: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });
  }

  acceder(): void {

  }

  get f() {
    return this.form.controls;
  }

}
