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
  optionSelectedValue
  showInput : boolean = false
  checkboxState : boolean = false
  reportFormValid : boolean = false
  crimeDescription : string = ''
  crimeText : string = ''
  pic = '\assets\icon\magnifying-glass (10).png'
  constructor(public modCtrl:ModalController, public events : Events, public navParam:NavParams, public socialSharing:SocialSharing) {
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
  // closePopup(){
  //   this.modCtrl.dismiss(null);    
  // }

  sendData(){
    let report = [{
      description: this.crimeDescription,
      lat: '23424',
      lng: '3333',
      postToTweeter : this.checkboxState
    }]
    this.events.publish('firebaseReport', report)
    this.modCtrl.dismiss(report) 
  }
  // fetchCrimeCategories(){
  //   this.firebaseService.fetchCrimeCategories().then(data=>{
  //     this.result = data
  //     console.log(this.result);
  //   })
  // }

  setCheckState(event){
    this.checkboxState = event.detail.checked
    console.log(this.checkboxState);
  }

  fetch(){
    this.events.subscribe('crimeTypes:List', (data) =>{
      console.log(data);
      
      this.result = data
      console.log(this.result);
      
    })
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

  // submitToFirebase(){
  //   this.firebaseService.submit()
  // }
  
  // submit(){
  //   this.submitToFirebase()
  //   //this.tweet()
  // }
  ngOnInit() {
    //this.fetch()
    console.log('why');

    this.result = this.navParam.get("result")
    
  }

}
