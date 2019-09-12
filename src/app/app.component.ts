import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
    appMenu =[{
      url: 'home',
      title: 'Home',
      icon: "home",
    },{
      url: 'crime-alert',
      title: 'Crime-Alert',
      icon: "alert",
    },
    {
      url: 'community-event',
      title: 'Community Event',
      icon: "paper" ,
    },
   {
    url: 'Logout',
    title: 'Sign Out',
    icon: "log-out",
   }]
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
