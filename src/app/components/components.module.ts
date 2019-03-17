import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { IonicImageLoader } from 'ionic-image-loader';
import { IonicModule } from '@ionic/angular';
import { NoticiaLoadingComponent } from './noticia-loading/noticia-loading.component';

@NgModule({
  declarations: [
    NoticiasComponent,
    NoticiaComponent,
    NoticiaLoadingComponent,
  ],
  exports: [
    NoticiasComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    IonicImageLoader,
  ]
})
export class ComponentsModule { }
