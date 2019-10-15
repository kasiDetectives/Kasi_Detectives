import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { ValueAccessor } from '@ionic/angular/dist/directives/control-value-accessors/value-accessor';


var database = firebase.database();
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  crimesList : Array<any> = []
  savedLocations : Array<any> = []
  userIncidents : Array<any> = []
  tempArray : Array<any> = []
  constructor() { }

  //Retrieving data from firebase/// Types of crimes
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

  //Retrieving data from firebase/// Reported locations
  fetchSavedLocations(){
    ​   
       return new Promise((resolve, reject) => {
    ​ 
        firebase.database().ref().child('HighRisk').on('child_added', result=>{
          //this.clearArray(this.savedLocations)

          // //console.log(result.val());
          
          // let locations = JSON.parse(JSON.stringify(result))
          // console.log(locations);
         let locations = result.val()
         console.log(locations);
         
          this.clearArray(this.tempArray)
          for(let key in locations){
            this.tempArray.push({
              place : Object.values(locations[key]),
              key : key
            })
          

            //console.log(this.tempArray);
         
         }
          
         for(let i = 0; i < this.tempArray.length; i++){
           
          console.log(this.tempArray[i]);
          
         this.savedLocations.push({
           crimeType: this.tempArray[i].place[0],
           lat: this.tempArray[i].place[1],
           lng: this.tempArray[i].place[2],
           key: this.tempArray[i].key,
          //  status: 'highRisk'
         })
       }
         console.log(this.tempArray);
         console.log(this.savedLocations);
         resolve(this.savedLocations)
        })
        
        
        
        
        console.log(this.savedLocations);
       })
       
}

fetchUserIncidents(){
  ​
     return new Promise((resolve, reject) => {
  ​ 
      firebase.database().ref().child('Incidence').on('child_added', result=>{
        let locations = JSON.parse(JSON.stringify(result))
        console.log(locations);
       
        this.clearArray(this.tempArray)
        for(let key in locations){
          
          this.tempArray.push({
            place : Object.values(locations[key])
          })
        
        }
        console.log(this.tempArray);
       for(let i = 0; i < this.tempArray.length; i++){
        this.userIncidents.push({
          crimeType: this.tempArray[i].place[0],
          lat: this.tempArray[i].place[1],
          lng: this.tempArray[i].place[2]
        })
      }
      resolve(this.userIncidents)
        console.log(this.userIncidents);
        
      })
     })
}

  //Submitting data to firebase /// Pinning new report
  submit(submitInfo){
    let userId = submitInfo.userId
    let place = submitInfo.address
    let description = submitInfo.description
    let lat = submitInfo.lat
    let lng = submitInfo.lng

    console.log(lat);
    console.log(lng);
    console.log(description);
    
    
    
    var newPostKey = firebase.database().ref().child('Incident/' + "/" + place + "/").push().key;
    console.log(newPostKey);
    
    firebase.database().ref().child('Incident/'+ "/" + place + "/" + newPostKey + "/").update({
      description: description,
      lat : lat,
      lng : lng,
      userId: userId
    })
  }

  clearArray(array){
    for(let i=0; i < array.length; i++){array.splice(i)}
  }
}
