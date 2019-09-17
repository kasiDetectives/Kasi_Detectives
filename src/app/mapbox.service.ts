import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  constructor(public http : HttpClient) { }
  city = "Pretoria"
   AppID = "&APPID=13e0cbb2f2cede6f03e901ab6f8f53e8"
  autoComplete(place){
    return this.http.get('//api.mapbox.com/geocoding/v5/mapbox.places/' + place + '.json?limit=20&access_token=pk.eyJ1Ijoid2lsMW5ndDBuIiwiYSI6ImNrMG1mbnZqcDEydjMzbW40bWNtMmU4NjgifQ.6ggdrR-Y2ng55vBDhU7Xlg')
 
  }
}
