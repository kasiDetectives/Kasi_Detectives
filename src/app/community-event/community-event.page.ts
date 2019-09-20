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
  coordinates = []
  features =[]
  place =[]
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
   this.clearArray(this.place)
    // console.log(this.result);
    this.mapboxService.autoComplete(this.searchString).subscribe((data) => {
       this.result = data
       console.log(this.result);
        this.features = this.result.features
        console.log(this.features);
        
   
        for(let i = 0; i < this.features.length; i++){
        //this.coordinates.push(this.features[i])
        this.place.push({
          coordinates : this.features[i].geometry.coordinates,
          place : this.features[i].place_name,
          name : this.features[i].text,
          // region : this.features[i].context[0].text,
          // regionCode : this.features[i].context[0].short_code,
          // country : this.features[i].context[1].text,
          //code : this.features[i].context[1].wikidata,
          context : this.features[i].context
        })
        }
      
      
        console.log("Hello  ------------------------------------");   
      console.log(this.features);
      
       console.log(this.coordinates);
       //this.check(this.result)

       console.log("place           --------------------------");
       console.log(this.place);
       
    })
    
  

  }

  clearArray(array){
    for(let i = 0; i < array.length; i++){
      array.splice(i)
    }
    
  }
  check(data){
    let result = data
    let coordinates
    for(let i = 0; i < result.length; i++){
     coordinates = result.features[i].geometry.coordinates
    }
    console.log(coordinates);
  }
  ngOnInit() {
  }

}
