import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { NavigationService } from '../navigation.service';
=======
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
>>>>>>> 43e862645d4ffb57b202d4af7506a3e49fc2ce0f

@Component({
  selector: 'app-crime-alert',
  templateUrl: './crime-alert.page.html',
  styleUrls: ['./crime-alert.page.scss'],
})
export class CrimeAlertPage implements OnInit {
<<<<<<< HEAD
  
  constructor(public navigationService : NavigationService) { }
  
=======
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

>>>>>>> 43e862645d4ffb57b202d4af7506a3e49fc2ce0f
  ngOnInit() {
  }

}
