import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ImageLoaderConfigService } from 'ionic-image-loader';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ImageLoaderConfigService : ImageLoaderConfigService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.ImageLoaderConfigService.enableFallbackAsPlaceholder(true);
      this.ImageLoaderConfigService.setFallbackUrl('assets/img/noLoad.png');
      this.ImageLoaderConfigService.setMaximumCacheAge(24 * 60 * 60 * 1000);
      this.ImageLoaderConfigService.setWidth('500px')
      this.statusBar.styleBlackOpaque();
      this.splashScreen.hide();
    });
  }

}
