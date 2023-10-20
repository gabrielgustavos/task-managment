import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class HeaderService {
  private tituloHeaderAlterado = new Subject<string>();
  private usuario = new Subject<any>();

  informacaoTituloHeaderAlterado$ = this.tituloHeaderAlterado.asObservable();

  informacaoUsuario$ = this.usuario.asObservable();
  alterarTitulo(titulo: string) {
    this.tituloHeaderAlterado.next(titulo);
  }

  alterarUsuario(usuario: any) {
    this.usuario.next(usuario);
  }
}
