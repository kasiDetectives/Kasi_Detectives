import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  constructor(public http : HttpClient) { }
  city = "Pretoria"
  address = '//api.mapbox.com/geocoding/v5/mapbox.places/'
   AppID = "&APPID=13e0cbb2f2cede6f03e901ab6f8f53e8"
   returnParameters = "limit=10"
   apiKey = 'pk.eyJ1Ijoid2lsMW5ndDBuIiwiYSI6ImNrMG1mbnZqcDEydjMzbW40bWNtMmU4NjgifQ.6ggdrR-Y2ng55vBDhU7Xlg'
  autoComplete(place){
    return this.http.get(this.address + place + '.json?' + this.returnParameters + '&access_token=' + this.apiKey)
 
  }
}
