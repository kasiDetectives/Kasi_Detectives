import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit {
    user
    ussr =0
    constructor(public navigationService : NavigationService, public userService : UsersService, public router : Router) {
      console.log("why");
      
      this.checkState()
    }
  
    checkState(){
      this.user = this.userService.returnUserProfile()
      console.log(this.user);
      // if(this.user[0] ===undefined){
      //   console.log(true);
      //   this.router.navigate(['/login'])
      // }
  
      if(this.ussr===0){
        console.log(true);
        this.router.navigate(['/login'])
      }
    }
  
    ngOnInit() {
    }
  
  }
  