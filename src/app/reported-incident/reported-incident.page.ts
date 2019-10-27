import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-reported-incident',
  templateUrl: './reported-incident.page.html',
  styleUrls: ['./reported-incident.page.scss'],
})
export class ReportedIncidentPage implements OnInit {
  lat
  lng
  address
  crimeType
  constructor(public modCtrl:ModalController, public navParam:NavParams) { }

  ngOnInit() {
    this.lat = this.navParam.get('lat')
    this.lng = this.navParam.get('lng')
    this.address = this.navParam.get('address')
    this.crimeType = this.navParam.get('crimeType')
    console.log(this.crimeType);
    console.log(this.address);
    console.log(this.lat);
    }
  reportCrime(){
    let report = [{
      lat: this.lat,
      lng: this.lng,
      address: this.address.surburb,
      report: true
    }]
    this.modCtrl.dismiss(report) 
  }
  closePopup(){
    this.modCtrl.dismiss();    
  }

}
