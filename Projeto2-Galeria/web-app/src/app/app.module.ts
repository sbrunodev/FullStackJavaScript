import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeCarouselComponent } from './componentes/home/home-carousel/home-carousel.component';
import { ManterGaleriaComponent } from './componentes/galeria/manter-galeria/manter-galeria.component';

import { GaleriaService } from './servicos/galeria/galeria.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeCarouselComponent,
    ManterGaleriaComponent
  ],
  imports: [ // Quando é algo do nucleo do Angular
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [GaleriaService], // Quando eu crio algo ...
  bootstrap: [AppComponent]
})
export class AppModule { }
