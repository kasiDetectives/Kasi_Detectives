import { Injectable } from '@angular/core';
import * as firebase from 'firebase'


var database = firebase.database();
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  crimesList = []
  constructor() { }

  fetchCrimeCategories(){
  var result = firebase.database().ref().child('CrimeTypes')
  result.on('child_added', snap =>{
    this.crimesList.push(snap.key)
    console.log(this.crimesList);
    
   })
   
    return this.crimesList
  }
}
