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
   
}
