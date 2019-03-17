import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';
import { IonicImageLoaderComponent } from 'ionic-image-loader';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss']
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;
  verNoticia: boolean;

  constructor(private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private datalocalService: DataLocalService,
    private platform: Platform,
    private ToastController : ToastController) { }

  ngOnInit() {
    this.verNoticia = true
    setTimeout(() => {
      this.verNoticia = false
    }, 800);
  }

  abrirNoticia() {
    // console.log('Noticia', );
    const browser = this.iab.create(this.noticia.url, '_system');

  }

  async lanzarMenu() {

    let guardarBorrarBtn;

    if (this.enFavoritos) {

      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.datalocalService.borrarNoticia(this.noticia);
        }
      };

    } else {

      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          this.datalocalService.guardarNoticia(this.noticia);
        }
      };

    }



    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            this.compartirNoticias();
          }
        },
        guardarBorrarBtn,
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          cssClass: 'action-dark',
          handler: () => {
          }
        }]
    });

    await actionSheet.present();

  }

  compartirNoticias() {

    if (this.platform.is('cordova'))
      //is mobile
      (this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      ))

    else {
      if (navigator['share']) {
        navigator['share']({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }
      else {
        let message = 'No esta soportado el share por tu navegador';
         this.presentToast(message);
      }
    }



  }


 async  presentToast( message){
    const toast  =  await this.ToastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
      closeButtonText: 'salir'
    });
    return toast.present();
  }

}
