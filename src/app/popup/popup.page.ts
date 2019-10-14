import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, Events} from '@ionic/angular'
import { ViewController } from '@ionic/core';
import {ModalController} from '@ionic/angular'
import { FirebaseService } from '../firebase.service';
import { LatLng } from '@ionic-native/google-maps';

//import * as firebase from
@Component({
  selector: 'app-popup',
  templateUrl: './popup.page.html',
  styleUrls: ['./popup.page.scss'],
})
export class PopupPage implements OnInit {
  result : Array<string>
  optionSelectedValue
  showInput : boolean = false
  lat
  lng
  address
  constructor(public modCtrl:ModalController, public events : Events, public navParam:NavParams) {
    // this.fetchCrimeCategories()
    this.events.subscribe('crimeTypes:List', (data) =>{
      let why = data
      console.log(why);
      
    })
  }
  load(){ 
    console.log('fgfdgdf');
    // this.events.publish('why:dd', 'ring')
    this.events.subscribe('why:dd', (data) =>{
      console.log(data);
      
    })
    this.events.subscribe('crimeTypes:List', (data) =>{
      let why = data
      console.log(why);
      
    })
  }

  checkState(event){
    let value = event.detail.value
    console.log(value);
    
  }
  closePopup(){
    this.modCtrl.dismiss();    
  }
  // fetchCrimeCategories(){
  //   this.firebaseService.fetchCrimeCategories().then(data=>{
  //     this.result = data
  //     console.log(this.result);
  //   })
  // }

  fetch(){
    this.events.subscribe('crimeTypes:List', (data) =>{
      console.log(data);
      
      this.result = data
      console.log(this.result);
      
    })
  }
  options(event){
    console.log(event.detail.value);
    this.optionSelectedValue = event.detail.value
    if(this.optionSelectedValue==='Other'){
      this.showInput = true
    }else{
      this.showInput =false
    }
  }
  
  
  ngOnInit() {
    //this.fetch()
    console.log('why');

    this.result = this.navParam.get("result")
    this.lat = this.navParam.get('lat')
    this.lng = this.navParam.get('lng')
    this.address = this.navParam.get('address')
  }

}
