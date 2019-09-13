import { Component, OnInit } from '@angular/core';
import { GooglemapService } from '../googlemap.service';

import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { NavigationService } from '../navigation.service';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-report-alert',
  templateUrl: './report-alert.page.html',
  styleUrls: ['./report-alert.page.scss'],
})
export class ReportAlertPage implements OnInit {
  user
  constructor(public navigationService : NavigationService, public userService : UsersService, public router : Router, public events : Events) {
    console.log("why");
    this.checkState()
    this.events.publish('currentPage:home', false)
  }
  checkState(){
    this.user = this.userService.returnUserProfile()
    console.log(this.user);
    if(this.user[0] ===undefined){
      console.log(true);
      this.router.navigate(['/login'])
    }
  }
  ngOnInit() {
  }

}