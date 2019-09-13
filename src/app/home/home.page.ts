import { Component } from '@angular/core';
import { Events } from '@ionic/angular';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public events : Events, public userService : UsersService) {
    this.checkUserState()
    this.run()
  }

  checkUserState(){
    this.events.subscribe('user:loggedOut', (boolean)=>{
      console.log(boolean);
      if(boolean === true){
        this.userService.destroyUserData()
        this.events.publish('user:created', false);
      }
    })
  }
  run(){
    console.log("running");
    this.events.publish('currentPage:home', true)
  }
}
