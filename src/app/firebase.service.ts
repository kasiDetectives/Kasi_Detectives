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


  addToOldUserReport = false
  addToNewUserReport = true
  addToHighRisk = false
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
// fetchUserIncidents(){
//      return new Promise((resolve, reject) => {
//       firebase.database().ref().child('Incident').on('child_added', result=>{
//         let locations = result.val()
//         console.log(locations);
//         this.clearArray(this.tempArray)
//         for(let key in locations){
//           this.tempArray.push({
//             object : Object.values(locations[key]),
//             key: key
//           })
//         }
//         console.log(this.tempArray);
//        for(let i = 0; i < this.tempArray.length; i++){
//         this.userIncidents.push({
//           crimeType: this.tempArray[i].object[1],
//           lat: this.tempArray[i].object[2],
//           lng: this.tempArray[i].object[0]
//         })
//       }
//         resolve(this.userIncidents)
//         console.log(this.userIncidents);
//       })
//      })
// }

fetchUserIncidents(){
  return new Promise((resolve, reject) => {
   firebase.database().ref().child('Incidents').on('child_added', result=>{
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
checkHighRisks(submitInfo){
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
    let addToOldUserReport = false
    let addToNewUserReport
    let addToHighRisk = false

    addToNewUserReport = false
    addToOldUserReport = false
    addToHighRisk = false
    let highRiskReport = []
    let incidentReport = []
  firebase.database().ref().child('HighRisk').once('value').then(snap => {
    let reported = snap.val()
    for(let place in reported){
      console.log(place);
      let placeInfo= (reported[place])
      for(let placeKey in placeInfo){
        let values = (placeInfo[placeKey])
        highRiskReport.push({
          place: place,
          values: values,
          key: placeKey
        })
      }
      console.log(Object.values(reported[place]));
      
      
    }
    console.log(highRiskReport);
    // pi = place index
    for(let pi = 0; pi < highRiskReport.length; pi++){
      // ri = report index
      for(let ri = 0; ri < highRiskReport[pi].values.length; ri++){
        if(lat === highRiskReport[pi].values[ri].lat && lng === highRiskReport[pi].values[ri].lng ){
          addToHighRisk = true
          addToNewUserReport = false
          addToOldUserReport = false
          console.log(addToOldUserReport, 'adding to old report');
          console.log(addToHighRisk, 'adding to high risk');
          console.log(addToNewUserReport, 'adding to new report');
          
        }
      }
    }
    console.log("i am here");
    resolve(addToHighRisk)
  })
})
}
checkIncidents(submitInfo){
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
    let addToOldUserReport = false
    let addToNewUserReport
    let addToHighRisk = false

    addToNewUserReport = false
    addToOldUserReport = false
    addToHighRisk = false
    let highRiskReport = []
    let incidentReport = []
    let result = []
  firebase.database().ref().child('Incidents').once('value').then(incidentSnap => {
    let reportedIncidents = incidentSnap.val()
    console.log(reportedIncidents);
    if(reportedIncidents === null){
      addToOldUserReport = false
      result = [{
        submit : addToOldUserReport,
        incidentKey : null,
        numberOfReports : 0
      }]
    }
    for(let place in reportedIncidents){
      let placeInfo = reportedIncidents[place]
      console.log(placeInfo);
      for(let placeKey in placeInfo){
        console.log(placeKey);
        console.log(place);
      let values = (placeInfo[placeKey])
      console.log(values);
      
      incidentReport.push({
        place: place,
        values: values,
        key: placeKey
      })
      }
      
      
      
    }
    console.log(incidentReport);
    
    // upi = user [reported] place index
    for(let upi = 0; upi < incidentReport.length; upi++){
      let incidentKey
      let numberOfReports
      // uvi = user [reported ] value index
      // for(let uvi = 0; uvi < incidentReport[upi].values.length; uvi++){
        if(lat === incidentReport[upi].values.lat && lng === incidentReport[upi].values.lng){
          addToHighRisk = false
            addToNewUserReport = false
            addToOldUserReport = true
            numberOfReports = incidentReport[upi].values.numberOfReports
            incidentKey = incidentReport[upi].key
            console.log(numberOfReports);
            console.log(incidentKey);
            
            
            console.log(addToOldUserReport, 'adding to old report');
            console.log(addToHighRisk, 'adding to high risk');
            console.log(addToNewUserReport, 'adding to new report');
            
        }
        result = [{
          submit : addToOldUserReport,
          incidentKey : incidentKey,
          numberOfReports : numberOfReports
        }]
      // }
    }
    
    
    console.log(incidentReport);
    resolve(result)
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
    let addToOldUserReport = false
    let addToNewUserReport
    let addToHighRisk = false

    addToNewUserReport = false
    addToOldUserReport = false
    addToHighRisk = false
    let highRiskReport = []
    let incidentReport = []
    console.log(lat);
    console.log(lng);
    console.log(description);
    console.log(userId);
    console.log(place);
      //checking if place has been reported before
      
    
    if(addToOldUserReport === false && addToHighRisk === false && addToNewUserReport === true){
      console.log(addToOldUserReport, 'adding to old report');
      console.log(addToHighRisk, 'adding to high risk');
      console.log(addToNewUserReport, 'adding to new report');


      var newPostKey = firebase.database().ref().child('Incidents/' + "/" + place + "/").push().key;
    console.log(newPostKey);
      firebase.database().ref().child('Incidents/'+ "/" + place + "/" + newPostKey).update({
        lat : lat,
        lng : lng,
        numberOfReports: 1       
      })

      firebase.database().ref().child('Incidents/'+ "/" + place + "/" + newPostKey + '/' + userId).update({
        description: description,
          date: date,
          month: month,
          year: year
      })
    }
    
    resolve()
    let gate = 'hell'
    console.log(gate);
    
  })
}
finallySubmit(addToHighRisk, addToOldUserReport, addToNewUserReport){
  console.log('hello');
  
}
submitNew(submitInfo){
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
    let addToOldUserReport = false
    let addToNewUserReport
    let addToHighRisk = false

    addToNewUserReport = false
    addToOldUserReport = false
    addToHighRisk = false
    let highRiskReport = []
    let incidentReport = []
    console.log(lat);
    console.log(lng);
    console.log(description);
    console.log(userId);
    console.log(place);
      //checking if place has been reported before

      console.log(addToOldUserReport, 'adding to old report');
      console.log(addToHighRisk, 'adding to high risk');
      console.log(addToNewUserReport, 'adding to new report');


      var newPostKey = firebase.database().ref().child('Incidents/' + "/" + place + "/").push().key;
    console.log(newPostKey);
      firebase.database().ref().child('Incidents/'+ "/" + place + "/" + newPostKey).update({
        lat : lat,
        lng : lng,
        numberOfReports: 1        
      })

      firebase.database().ref().child('Incidents/'+ "/" + place + "/" + newPostKey + '/' + userId).update({
        description: description,
          date: date,
          month: month,
          year: year
      })
    
    
    resolve()
    let gate = 'hell'
    console.log(gate);
    
  })
}
submitToOldIncidents(submitInfo, key, numberOfReports){
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
    let addToOldUserReport = false
    let addToNewUserReport
    let addToHighRisk = false

    addToNewUserReport = false
    addToOldUserReport = false
    addToHighRisk = false
    let highRiskReport = []
    let incidentReport = []
    console.log(lat);
    console.log(lng);
    console.log(description);
    console.log(userId);
    console.log(place);
      //checking if place has been reported before

      console.log(addToOldUserReport, 'adding to old report');
      console.log(addToHighRisk, 'adding to high risk');
      console.log(addToNewUserReport, 'adding to new report');

      
      var newPostKey = firebase.database().ref().child('Incidents/' + "/" + place + "/").push().key;
      var postKey = key
      console.log(postKey);
      
    console.log(newPostKey);
      firebase.database().ref().child('Incidents/'+ "/" + place + "/" + postKey).update({
        lat : lat,
        lng : lng,
        numberOfReports: numberOfReports + 1       
      })

      firebase.database().ref().child('Incidents/'+ "/" + place + "/" + postKey + '/' + userId).update({
        description: description,
          date: date,
          month: month,
          year: year
      })
    
    
    resolve()    
  })
}
submitToHighRisk(submitInfo){
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
    let addToOldUserReport = false
    let addToNewUserReport
    let addToHighRisk = false

    addToNewUserReport = false
    addToOldUserReport = false
    addToHighRisk = false
    let highRiskReport = []
    let incidentReport = []
    console.log(lat);
    console.log(lng);
    console.log(description);
    console.log(userId);
    console.log(place);
      //checking if place has been reported before

      console.log(addToOldUserReport, 'adding to old report');
      console.log(addToHighRisk, 'adding to high risk');
      console.log(addToNewUserReport, 'adding to new report');


      var newPostKey = firebase.database().ref().child('HighRisk/' + "/" + place + "/").push().key;
    console.log(newPostKey);
      firebase.database().ref().child('HighRisk/'+ "/" + place + "/" + newPostKey).update({
        lat : lat,
        lng : lng,
        numberOfReports: 1        
      })

      firebase.database().ref().child('HighRisk/'+ "/" + place + "/" + newPostKey + '/' + userId).update({
        description: description,
          date: date,
          month: month,
          year: year
      })
    
    
    resolve()
  })   
}
// submit(submitInfo){
//   return new Promise((resolve, reject) => {
//     this.getDate()
//     let userId = submitInfo.userId
//     let place = submitInfo.address
//     let description = submitInfo.description
//     let lat = submitInfo.lat
//     let lng = submitInfo.lng
//     let date = this.date
//     let month = this.month
//     let year = this.year
//     console.log(lat);
//     console.log(lng);
//     console.log(description);
//     console.log(userId);
//     console.log(place);
    
    
    
//     var newPostKey = firebase.database().ref().child('Incident/' + "/" + place + "/").push().key;
//     console.log(newPostKey);
//     firebase.database().ref().child('Incident/'+ "/" + place + "/" + newPostKey).update({
      
      
//       description: description,
//       lat : lat,
//       lng : lng,
//       userId: userId,
//       date: date,
//       month: month,
//       year: year
//     })
//     resolve()
//   })
// }
  clearArray(array){
    for(let i=0; i < array.length; i++){array.splice(i)}
  }
}