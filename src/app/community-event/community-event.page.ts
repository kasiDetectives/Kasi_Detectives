import { Component, OnInit } from '@angular/core';
import { GooglemapService } from '../googlemap.service';

import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-community-event',
  templateUrl: './community-event.page.html',
  styleUrls: ['./community-event.page.scss'],
})
export class CommunityEventPage implements OnInit {
  user
  constructor(public navigationService : NavigationService, public userService : UsersService, public router : Router) {
    console.log("why");
    this.checkState()
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
