import { Component, OnInit } from '@angular/core';
import { GooglemapService } from '../googlemap.service';

import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { NavigationService } from '../navigation.service';
import { Events } from '@ionic/angular';
import { MapboxService } from '../mapbox.service';

@Component({
  selector: 'app-community-event',
  templateUrl: './community-event.page.html',
  styleUrls: ['./community-event.page.scss'],
})
export class CommunityEventPage implements OnInit {
  user
  searchString
  result
  constructor(public navigationService : NavigationService, public userService : UsersService, public mapboxService : MapboxService, public router : Router, public events: Events) {
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

  autocomplete(){
   
    // console.log(this.result);
    this.mapboxService.autoComplete(this.searchString).subscribe((data) => {
       this.result = data
       console.log(this.result);
    })

  }
  ngOnInit() {
  }

}
