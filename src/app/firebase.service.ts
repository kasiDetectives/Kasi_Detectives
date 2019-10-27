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
  currentDate
  monthNum
  monthArray
  month
  date
  year
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
    return new Promise((resolve, reject) => {
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
  getDate(){
    this.currentDate = new Date()
    console.log(this.currentDate);
    this.date = this.currentDate.getDate()
    console.log(this.date);
    this.month 
    this.monthArray = [
      {key: 0, value: 'January'},
      {key: 1, value: 'February'},
      {key: 2, value: 'March'},
      {key: 3, value: 'April'},
      {key: 4, value: 'May'},
      {key: 5, value: 'June'},
      {key: 6, value: 'July'},
      {key: 7, value: 'August'},
      {key: 8, value: 'September'},
      {key: 9, value: 'October'},
      {key: 10, value: 'November'},
      {key: 11, value: 'December'}
    ]
    
    this.monthNum = this.currentDate.getMonth()
    for(let i = 0; i < this.monthArray.length; i++){
      if(this.monthNum === this.monthArray[i].key){
        this.month = this.monthArray[i].value
      }
    }
    console.log(this.month);
    this.year = this.currentDate.getFullYear()
    console.log(this.year);
  }
fetchUserIncidents(){
     return new Promise((resolve, reject) => {
      firebase.database().ref().child('Incident').on('child_added', result=>{
        let locations = result.val()
        console.log(locations);
        this.clearArray(this.tempArray)
        for(let key in locations){
          this.tempArray.push({
            object : Object.values(locations[key]),
            key: key
          })
        }
        console.log(this.tempArray);
       for(let i = 0; i < this.tempArray.length; i++){
        this.userIncidents.push({
          crimeType: this.tempArray[i].object[1],
          lat: this.tempArray[i].object[2],
          lng: this.tempArray[i].object[0]
        })
      }
        resolve(this.userIncidents)
        console.log(this.userIncidents);
      })
     })
}
  //Submitting data to firebase /// Pinning new report
  submit(submitInfo){
  return new Promise((resolve, reject) => {
    this.getDate()
    let userId = submitInfo.userId
    let place = submitInfo.address
    let description = submitInfo.description
    let lat = submitInfo.lat
    let lng = submitInfo.lng
    let date = this.date
    let month = this.month
    let year = this.year
    console.log(lat);
    console.log(lng);
    console.log(description);
    console.log(userId);
    console.log(place);
    
    
    
    var newPostKey = firebase.database().ref().child('Incident/' + "/" + place + "/").push().key;
    console.log(newPostKey);
    firebase.database().ref().child('Incident/'+ "/" + place + "/" + newPostKey).update({
      
      
      description: description,
      lat : lat,
      lng : lng,
      userId: userId,
      date: date,
      month: month,
      year: year
    })
    resolve()
  })
}
  clearArray(array){
    for(let i=0; i < array.length; i++){array.splice(i)}
  }
}