import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, Events, AlertController} from '@ionic/angular'
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
  crimeDescription
  reportFormValid
  checkboxState
  crimeText
  userId
  constructor(public modCtrl:ModalController, public events : Events, public navParam:NavParams, public alertController: AlertController) {
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
      this.crimeDescription = ''
    }else{
      this.showInput =false
      this.crimeDescription =  this.optionSelectedValue
      console.log(this.crimeDescription);
    }
    this.checkValidity()
  }
  sendData(){
    console.log(this.crimeDescription);
    console.log(this.lat);
    console.log(this.lng);
    console.log(this.checkboxState);
    console.log(this.address);
    
    
    let report = [{
      description: this.crimeDescription,
      lat: this.lat,
      lng: this.lng,
      postToTweeter : this.checkboxState,
      address: this.address.surburb,
      userId: this.userId
    }]
    this.modCtrl.dismiss(report) 
  }
  
  setCheckState(event){
    this.checkboxState = event.detail.checked
    console.log(this.checkboxState);
  }

  setInput(event){
    console.log(event.detail.value);
    this.crimeText = event.detail.value
    console.log(this.crimeText);
    this.crimeDescription = this.crimeText
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

  async verifySubmit() {
    const alert = await this.alertController.create({
      header: 'Login',
      message: 'You are about to report ' + this.address['street'] + ', ' + this.address['section'] + ' as a crime area. Continue?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'success',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: (user) => {
            console.log('Confirm Okay');
            this.sendData()
            //this.router.navigate(['/login'])
          }
        }
      ]
    });

    await alert.present();
  }

  
  
  ngOnInit() {
    //this.fetch()
    console.log('why');

    this.result = this.navParam.get("result")
    this.lat = this.navParam.get('lat')
    this.lng = this.navParam.get('lng')
    this.address = this.navParam.get('address')
    this.userId = this.navParam.get('userId')
    this.crimeType = this.navParam.get('crimeType')
    console.log(this.crimeType);
    
  }

}