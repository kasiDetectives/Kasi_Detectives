import { Component } from '@angular/core';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public events : Events) {}
  run(){
    console.log("running");
    this.events.publish('menu:clicked', true)
  }
}
