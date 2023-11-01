import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';

import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { MensajesRespuestaCodigo } from '../utils/mensajes-respuesta-codigo.enum';
import { UsuarioEnSesion } from '../models/usuario-en-sesion.interface';
import { HttpRespuesta } from '../models/http-respuesta.interface';
import { Payload } from '../models/payload.interface';
import { TIEMPO_MAXIMO_INACTIVIDAD_PARA_CERRAR_SESION } from '../utils/tokens';
import { MensajesRespuestaAutenticacion } from './mensajes-respuesta-autenticacion.enum';
import { existeMensajeEnEnum } from '../utils/funciones';
import { SIVIMSS_TOKEN } from '../utils/constantes';

export interface Modulo {
  idModuloPadre: string | null;
  idFuncionalidad: string | null;
  idModulo: string;
  titulo: string;
  modulos: Modulo[] | null;
  activo?: boolean;
  ruta?: string;
  icono?: string;
}

export interface PermisosPorRol {
  permisosPorFuncionalidad: PermisosPorFuncionalidad[];
}

export interface PermisosPorFuncionalidad {
  idFuncionalidad: string;
  permisos: Permiso[];
}

export interface Permiso {
  idPermiso: string;
  descPermiso: string;
}


@Injectable()
export class AutenticacionService {
  usuarioEnSesionSubject: BehaviorSubject<UsuarioEnSesion | null> =
    new BehaviorSubject<UsuarioEnSesion | null>(null);
  usuarioEnSesion$: Observable<UsuarioEnSesion | null> =
    this.usuarioEnSesionSubject.asObservable();

  permisosUsuarioSubject: BehaviorSubject<PermisosPorFuncionalidad[] | null> =
    new BehaviorSubject<PermisosPorFuncionalidad[] | null>(null);
  permisosUsuario$: Observable<PermisosPorFuncionalidad[] | null> =
    this.permisosUsuarioSubject.asObservable();

  paginaCargadaSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  paginaCargada$: Observable<boolean> =
    this.paginaCargadaSubject.asObservable();

  existeUnaSesion$: Observable<boolean> = this.usuarioEnSesion$.pipe(
    map((usuario: UsuarioEnSesion | null) => !!usuario)
  );

  subsSesionInactivaTemporizador!: Subscription;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly controladorInactividadUsuarioService: BnNgIdleService,
    @Inject(TIEMPO_MAXIMO_INACTIVIDAD_PARA_CERRAR_SESION)
    private readonly tiempoMaximoInactividad: number
  ) {
    //this.recuperarSesionAlActualizarPagina();
  }

  /**
   * Crea la sesion nuevamente si el usuario actualiza la pagina
   */
  recuperarSesionAlActualizarPagina() {
    const token: string | null = localStorage.getItem(SIVIMSS_TOKEN);
    if (token) {
      try {
        const usuario: UsuarioEnSesion = this.obtenerUsuarioDePayload(token);
        this.usuarioEnSesionSubject.next(usuario);
        setTimeout(() => {
          this.obtenerPermisos(usuario.idRol).subscribe(
            (respuesta: HttpRespuesta<any>) => {
              this.permisosUsuarioSubject.next(respuesta.datos.permisosUsuario);
              this.iniciarTemporizadorSesion();
              this.paginaCargadaSubject.next(true);
            }
          );
        }, 1000);
      } catch (ex) {
        this.cerrarSesion();
        this.paginaCargadaSubject.next(true);
      }
    } else {
      this.paginaCargadaSubject.next(true);
    }
  }

  iniciarSesion(
    usuario: string,
    contrasenia: string,
    mostrarMsjContraseniaProxVencer: boolean = true
  ): Observable<string> {
    return this.httpClient
      .post<any>(environment.api.login + `/login`, { usuario, contrasenia })
      .pipe(
        concatMap((respuesta: HttpRespuesta<any>) => {
          if (
            this.esInicioSesionCorrecto(respuesta.mensaje) ||
            (respuesta.mensaje ===
              MensajesRespuestaAutenticacion.ContraseniaProximaVencer &&
              !mostrarMsjContraseniaProxVencer)
          ) {
            const usuario: UsuarioEnSesion = this.obtenerUsuarioDePayload(
              respuesta.datos
            );
            return this.obtenerPermisos(usuario.idRol).pipe(
              map((respuestaPermisos: HttpRespuesta<any>) => {
                this.crearSesion(
                  respuesta.datos,
                  usuario,
                  respuestaPermisos.datos.permisosUsuario
                );
                this.paginaCargadaSubject.next(true);
                return MensajesRespuestaAutenticacion.InicioSesionCorrecto;
              })
            );
          } else if (
            this.esMensajeRespuestaValido(
              MensajesRespuestaAutenticacion,
              respuesta.mensaje
            )
          ) {
            return of<string>(respuesta.mensaje);
          } else {
            return 'Ocurrió un error al intentar iniciar sesión';
          }
        })
      );
  }

  esMensajeRespuestaValido(
    enumObj: { [s: string]: string },
    mensaje: string
  ): boolean {
    return existeMensajeEnEnum(MensajesRespuestaAutenticacion, mensaje);
  }

  esInicioSesionCorrecto(mensaje: string): boolean {
    return mensaje === MensajesRespuestaAutenticacion.InicioSesionCorrecto;
  }

  crearSesion(
    token: string,
    usuario: UsuarioEnSesion,
    permisosUsuario: PermisosPorFuncionalidad[]
  ): void {
    this.usuarioEnSesionSubject.next(usuario);
    this.permisosUsuarioSubject.next(permisosUsuario);
    localStorage.setItem(SIVIMSS_TOKEN, token);
    this.obtenerCatalogos();
    this.iniciarTemporizadorSesion();
  }

  obtenerUsuarioDePayload(token: string): UsuarioEnSesion | never {
    const payload: Payload | null = new JwtHelperService().decodeToken<Payload>(
      token
    );
    if (payload) {
      return JSON.parse(payload.sub);
    } else {
      throw new Error(
        'Error al intentar obtener el usuario del payload en el token'
      );
    }
  }

  cerrarSesion() {
    this.usuarioEnSesionSubject.next(null);
    this.permisosUsuarioSubject.next(null);
    localStorage.removeItem(SIVIMSS_TOKEN);
    localStorage.clear();
    this.router.navigate(['/inicio-sesion']);
    this.detenerTemporizadorSesion();
  }

  obtenerModulosPorIdRol(idRol: string): Observable<HttpRespuesta<Modulo[]>> {
    return this.httpClient.post<HttpRespuesta<any>>(
      environment.api.login + `/menu`,
      { idRol }
    );
  }

  actualizarContrasenia(
    usuario: string,
    contraseniaAnterior: string,
    contraseniaNueva: string
  ): Observable<HttpRespuesta<any>> {
    return this.httpClient.post<HttpRespuesta<any>>(
      environment.api.login + `/contrasenia/cambiar`,
      {
        usuario,
        contraseniaAnterior,
        contraseniaNueva,
      }
    );
  }

  obtenerPermisos(idRol: string) {
    return this.httpClient.post<HttpRespuesta<any>>(
      environment.api.login + `/permisos`,
      { idRol }
    );
  }

  existeFuncionalidadConPermiso(
    idFuncionalidad: string,
    idPermiso: string
  ): boolean {
    const permisosPorFuncionalidad: PermisosPorFuncionalidad[] | null =
      this.permisosUsuarioSubject.getValue();
    if (permisosPorFuncionalidad) {
      const funcionalidadEncontrada: PermisosPorFuncionalidad | undefined =
        permisosPorFuncionalidad.find(
          (permisosPorFuncionalidad: PermisosPorFuncionalidad) =>
            permisosPorFuncionalidad.idFuncionalidad === idFuncionalidad
        );
      if (funcionalidadEncontrada) {
        const permisoEncontrado: Permiso | undefined =
          funcionalidadEncontrada.permisos.find(
            (permiso: Permiso) => permiso.idPermiso === idPermiso
          );
        if (permisoEncontrado) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }

  iniciarTemporizadorSesion() {
    this.subsSesionInactivaTemporizador =
      this.controladorInactividadUsuarioService
        .startWatching(this.tiempoMaximoInactividad)
        .subscribe((estaElUsuarioInactivo: boolean) => {
          if (estaElUsuarioInactivo) {
            this.cerrarSesion();
          }
        });
  }

  detenerTemporizadorSesion() {
    this.controladorInactividadUsuarioService.stopTimer();
    if (this.subsSesionInactivaTemporizador) {
      this.subsSesionInactivaTemporizador.unsubscribe();
    }
  }

  validarCodigoRestablecerContrasenia(
    usuario: string,
    codigo: string
  ): Observable<string> {
    return this.httpClient
      .post<HttpRespuesta<any>>(
        environment.api.login + `/contrasenia/valida-codigo`,
        {
          usuario,
          codigo,
        }
      )
      .pipe(
        concatMap((respuesta: HttpRespuesta<any>) => {
          if (existeMensajeEnEnum(MensajesRespuestaCodigo, respuesta.mensaje)) {
            return of<string>(respuesta.mensaje);
          } else {
            return 'Ocurrió un error al intentar validar el código para recuperar contraseña';
          }
        })
      );
  }

  generarCodigoRestablecerContrasenia(
    usuario: string
  ): Observable<HttpRespuesta<any>> {
    return this.httpClient.post<HttpRespuesta<any>>(
      environment.api.login + `/contrasenia/genera-codigo`,
      { usuario }
    );
  }

  obtenerCatalogos(): void {
    this.httpClient
      .post<HttpRespuesta<any>>(
        environment.api.login + '/catalogos/consulta',
        {}
      )
      .subscribe({
        next: (respuesta) => {
          const { datos } = respuesta;
          const { catalogos } = datos ?? {};
          this.guardarCatalogosEnLocalStorage(catalogos);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  guardarCatalogosEnLocalStorage<T extends { [key: string]: T }>(obj: T): void {
    Object.keys(obj).forEach((propiedad) => {
      localStorage.setItem(
        `catalogo_${propiedad}`,
        JSON.stringify(obj[propiedad])
      );
    });
  }

  obtenerCatalogoDeLocalStorage<T>(propiedad: string): any {
    const catalogo = JSON.parse(localStorage.getItem(propiedad) as string);
    return catalogo ?? [];
  }
}
