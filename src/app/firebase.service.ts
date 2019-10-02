import { Injectable } from '@angular/core';
import * as firebase from 'firebase'


var database = firebase.database();
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  crimesList : Array<any> = []
  constructor() { }

  fetchCrimeCategoriess(){
  var result = firebase.database().ref().child('CrimeTypes')
  result.on('child_added', snap =>{
    this.crimesList.push(snap.key)
    
    console.log(this.crimesList);
   })

    return this.crimesList
  }

  fetchCrimeCategories(){
  return firebase.database().ref().child('CrimeTypes').once('value').then(result =>{
      let string =  (JSON.stringify(result));
      let answer = JSON.parse(string)
      for(let key in answer){this.crimesList.push(key)}
      this.crimesList.push('Other')
      return this.crimesList
    }).catch(error =>{
      console.log(error);
      return error
    })
  }
}
}