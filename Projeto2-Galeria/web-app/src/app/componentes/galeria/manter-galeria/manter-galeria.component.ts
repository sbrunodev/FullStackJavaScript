import { Component, OnInit } from '@angular/core';

import { GaleriaService } from '../../../servicos/galeria/galeria.service';

@Component({
  selector: 'app-manter-galeria',
  templateUrl: './manter-galeria.component.html',
  styleUrls: ['./manter-galeria.component.css']
})
export class ManterGaleriaComponent implements OnInit {

  constructor(private galeriaService: GaleriaService) { }

  ngOnInit() {
    console.log('Entrou');
    this.galeriaService.getTodos().subscribe(resp => {
      console.log(resp);
    });

  }

}
