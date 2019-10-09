import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, Events} from '@ionic/angular'
import { ViewController } from '@ionic/core';
import {ModalController} from '@ionic/angular'
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

//import * as firebase from
@Component({
  selector: 'app-popup',
  templateUrl: './popup.page.html',
  styleUrls: ['./popup.page.scss'],
})
export class PopupPage implements OnInit {
  result : Array<string>
  lat: String = ''
  lng: String = ''
  optionSelectedValue
  showInput : boolean = false
  checkboxState : boolean = false
  reportFormValid : boolean = false
  crimeDescription : string = ''
  crimeText : string = ''
  pic = '\assets\icon\magnifying-glass (10).png'
  constructor(public modCtrl:ModalController, public events : Events, public navParam:NavParams, public socialSharing:SocialSharing) {
    
  }
  closePopup(){
    this.modCtrl.dismiss(null);
  }

  sendData(){
    let report = [{
      description: this.crimeDescription,
      lat: this.lat,
      lng: this.lng,
      postToTweeter : this.checkboxState
    }]
    this.modCtrl.dismiss(report) 
  }
  
  setCheckState(event){
    this.checkboxState = event.detail.checked
    console.log(this.checkboxState);
  }

  setInput(event){
    console.log(event.detail.value);
    console.log(this.crimeText);
    this.crimeDescription = event.detail.value
    this.checkValidity()
  }

  checkValidity(){
    if(this.crimeDescription === ''){
        this.reportFormValid = false
        console.log(this.reportFormValid);
    }else{
      this.reportFormValid = true
      console.log(this.reportFormValid);
    }
  }

  options(event){
    console.log(event.detail.value);
    this.optionSelectedValue = event.detail.value
    if(this.optionSelectedValue==='Other'){
      this.showInput = true
      this.crimeDescription = ''
    }else{
      this.showInput =false
      this.crimeDescription = this.optionSelectedValue
    }
    this.checkValidity()    
  }

  tweet(){
    this.socialSharing.shareViaTwitter('A crime has been reported',this.pic,'').then(() =>{

    }).catch(() =>{

    })
  }

  ngOnInit() {
    this.result = this.navParam.get("result")
    this.lat = this.navParam.get('lat')
    this.lng = this.navParam.get('lng')    
    console.log(this.result);
    console.log(this.lat)
    console.log(this.lng)
  }
}
