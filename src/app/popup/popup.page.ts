import { Component, OnInit } from '@angular/core';
import {NavController, NavParams} from '@ionic/angular'
import { ViewController } from '@ionic/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.page.html',
  styleUrls: ['./popup.page.scss'],
})
export class PopupPage implements OnInit {

  constructor(public navCtrl:NavController,public navController:NavParams,private view:ViewController) { }

  closePopup(){
    this.view.();

  }
  ionViewDidLoad(){
    console.log('ionViewDidLoad')
  }
  ngOnInit() {
  }

}
