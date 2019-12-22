import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeCarouselComponent } from './componentes/home/home-carousel/home-carousel.component';
import { ManterGaleriaComponent } from './componentes/galeria/manter-galeria/manter-galeria.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeCarouselComponent,
    ManterGaleriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
