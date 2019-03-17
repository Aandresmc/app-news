import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { IonSearchbar, PopoverController } from '@ionic/angular';
import { ImageLoaderService } from 'ionic-image-loader';
import { ToastController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];
  Arraynoticias: Article[] = [];
  verSearch: boolean = false;
  @ViewChild('searchbar') search: IonSearchbar;
  constructor(private popoverCtrl: PopoverController ,
     private iab: InAppBrowser,
     private toastController: ToastController,
     private ImageLoaderService : ImageLoaderService,
     private noticiasService: NoticiasService) {

  }

  ngOnInit() {
    this.cargarNoticias();
  }

  loadData(event) {

    // console.log(event);

    this.cargarNoticias(event);
  }

  cargarNoticias(event?) {
    this.noticiasService.getTopHeadlines()
      .subscribe(resp => {
        // console.log('noticias', resp );

        if (resp.articles.length === 0) {
          if (event) {
            event.target.disabled = true;
            event.target.complete();
            return;
          }

        }

        // this.noticias = resp.articles;
        this.Arraynoticias.push(...resp.articles);
        this.noticias = this.Arraynoticias

        if (event) {
          event.target.complete();
        }

      },
        error => {
          console.log('error', error);
        });
  }

  clearCache(event) {
    setTimeout(() => {
      this.cargarNoticias();
      this.ImageLoaderService.clearCache();
      this.presentToast('Ultimas noticias cargadas!');
      event.target.complete();
    }, 1000);
  }

  activeSearch() {
    this.verSearch = true;
    setTimeout(() => {
      this.search.setFocus();
    }, 50);

  }

  async presentToast( message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'bottom',
      closeButtonText: 'salir'
    });
    return toast.present();
  }

  buscarNoticia(busqueda) {
    this.noticias = this.Arraynoticias
    this.noticias = this.noticiasService.buscarNoticia(busqueda, this.noticias);

  }


  menu(button){
    let fb = 'https://www.facebook.com/Aandresmc'
    let github = 'https://github.com/Aandresmc/app-news'
    let android = '' 
    let pagina = ''

    switch(button) { 
      case 'fb': { 
        pagina = fb
        const browser = this.iab.create(pagina, '_system');
         break; 
      } 
      case 'github': { 
        pagina = github
        const browser = this.iab.create(pagina, '_system');
         break; 
      } 
      default: { 
        pagina = android
        const browser = this.iab.create(pagina, '_system');
         break; 
      } 
   } 
   

  }
  
}
