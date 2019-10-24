import { NgModule, ApplicationModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx'
<<<<<<< HEAD
import { Geolocation } from '@ionic-native/geolocation/ngx';
=======

//import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

>>>>>>> db57338de12737570468a49a99d45027ce030c7b
import { PopupPageModule } from './popup/popup.module';
import { ReportedIncidentPageModule } from './reported-incident/reported-incident.module'
import * as firebase from 'firebase'
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

var firebaseConfig = {
  apiKey: "AIzaSyAqj9dyDMnp_Yjb2JiSr899kubQBx3dzbI",
  authDomain: "kasidetectives.firebaseapp.com",
  databaseURL: "https://kasidetectives.firebaseio.com",
  projectId: "kasidetectives",
  
  storageBucket: "kasidetectives.appspot.com",
  messagingSenderId: "207670776123",
  appId: "1:207670776123:web:b1f7be1f7bb88f7d70271e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [  BrowserModule, IonicModule.forRoot(), HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule, PopupPageModule, ReportedIncidentPageModule],
  providers: [
    StatusBar,
   File,
    SocialSharing,
    Keyboard,
    Camera,
    Geolocation,
    LocalNotifications, 
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
