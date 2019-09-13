import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  pageURL
  constructor() { }
  pageNavigator(url){
    this.pageURL = url
    console.log(this.pageURL);
    
  }
  returnPageURL(){
    console.log(this.pageURL);
    
    return this.pageURL
  }
}
