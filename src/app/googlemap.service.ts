import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GooglemapService {

  constructor(public http : HttpClient) {

   }

   myCity(){
     return this.http.get('//maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name,rating,formatted_phone_number&key="AIzaSyAqj9dyDMnp_Yjb2JiSr899kubQBx3dzbI')
   }

  // address = '//route.api.here.com/routing/7.2/'

  // app_id = "&APPID=13e0cbb2f2cede6f03e901ab6f8f53e8"
  // app_code = "9v2BkviRwi9Ot26kp2IysQ"
  // waypoint0= "geo!52.516858379,13.3884717"
  // waypoint1= "geo!52.51733824,13.394678415"
  // avoidareas= 52.517100760,13.3905424488;52.5169701849,13.391808451
  // fullstrings = '//route.api.here.com/routing/7.2/calculateroute.json?app_id=&APPID=13e0cbb2f2cede6f03e901ab6f8f53e8&app_code=9v2BkviRwi9Ot26kp2IysQ&waypoint0=geo!52.516858379,13.3884717&waypoint1=geo!52.51733824,13.394678415&mode=fastest;car;traffic:disabled&avoidareas=52.517100760,13.3905424488;52.5169701849,13.391808451'
  AvoidArea(avoidedAreas){
    console.log(avoidedAreas);
    
    return this.http.get('https://route.api.here.com/routing/7.2/calculateroute.json?app_id=zMRd9OoHnOxtuPVaMd6S&app_code=xonuNeoLdBs37GAGkdalqw&waypoint0=geo!52.516858379,13.3884717&waypoint1=geo!52.51733824,13.394678415&mode=fastest;car;traffic:disabled&avoidareas=52.517100760,13.3905424488;52.5169701849,13.391808451')
  //  return this.http.get('https://route.api.here.com/routing/7.2/calculateroute.json?waypoint0=-26.007142%2C28.219275&waypoint1=-26.100721%2C28.050423&mode=fastest%3Btruck&avoidareas=-26.097961%2C 28.057662%3B-26.083711%2C28.060538&app_id=zMRd9OoHnOxtuPVaMd6S&app_code=xonuNeoLdBs37GAGkdalqw')
  }
   
}
