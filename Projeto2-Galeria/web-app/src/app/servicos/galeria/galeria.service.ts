import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; // Permitir trabalhar com Observables, parecido com uma promisse. mas podemos enviar requisições e ele fica aguardando a requisição acontecer ...
import { ConfigClass } from '../../classes/config-class';
import { RespostaClass } from '../../classes/resposta-class';

const httpOpcoes = {
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}

const caminho = `${ConfigClass.getUrlApi().toString()}/galeria`;

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  constructor(private http: HttpClient) { }


  getTodos(): Observable<HttpResponse<RespostaClass>> {
    return this.http.get<RespostaClass>(
      caminho,
      {observe: 'response'},
    );
  }

}
