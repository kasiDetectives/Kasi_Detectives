import { Component, OnInit } from '@angular/core';
import { GooglemapService } from '../googlemap.service';


@Component({
  selector: 'app-community-event',
  templateUrl: './community-event.page.html',
  styleUrls: ['./community-event.page.scss'],
})
export class CommunityEventPage implements OnInit {

  constructor(public googlemapservice : GooglemapService ) {
    this.googlemapservice.myCity().subscribe((data)=>{
          console.log(data);
          
    })
   }

  ngOnInit() {
  }

}
