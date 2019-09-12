import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crime-alert',
  templateUrl: './crime-alert.page.html',
  styleUrls: ['./crime-alert.page.scss'],
})
export class CrimeAlertPage implements OnInit {
  user
  constructor(public userService : UsersService, public router : Router) {
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
