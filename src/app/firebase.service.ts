import { Injectable } from '@angular/core';
import * as firebase from 'firebase'


var database = firebase.database();
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  crimesList = []
  control = []
  constructor() { }

  fetchCrimeCategories(){
  var result = firebase.database().ref().child('CrimeTypes')
  result.on('child_added', snap =>{
    this.crimesList.push(snap.key)
    this.control.push(snap.key)
    
    console.log(this.crimesList);
   })
  }
  
  addOther(){
    if(this.crimesList.length === 0){
      this.fetchCrimeCategories()
          
    }else{
      if(this.control.length === this.crimesList.length){
        this.crimesList.push("Other")
      }
    }
      
  
  return this.crimesList
}
}