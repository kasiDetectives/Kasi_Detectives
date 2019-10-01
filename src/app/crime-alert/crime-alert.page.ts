import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-crime-alert',
  templateUrl: './crime-alert.page.html',
  styleUrls: ['./crime-alert.page.scss'],
})
export class CrimeAlertPage implements OnInit {
  
  constructor(public navigationService : NavigationService, private socialSharing: SocialSharing) { }
  
  tweet()
  {
    this.socialSharing.shareViaTwitter('A crime has been reported.', '', '').then(() =>
    {

    }).catch(()=>
    {

    })
  }
  ngOnInit() {
  }

}
