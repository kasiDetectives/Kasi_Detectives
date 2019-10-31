import { Component, OnInit } from '@angular/core';
import { ToastController, Events, ActionSheetController, LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UsersService } from '../users.service';

import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileForm
  name
  userId
  email
  pics
  user
  namePattern = "^(?=.*\[A-Z])(?=.*\[a-z])(?=.*\[A-Z]).{2,}$"
  emailPattern= "[a-zA-Z0-9-_.+#$!=%^&*/?]+[@][a-zA-Z0-9-]+[.][a-zA-Z0-9]+"
  image: any;
  secImage
  loggedInRecently = false

  constructor(public file:File, public actionSheetController:ActionSheetController, public userService : UsersService,public camera:Camera, public loader:LoadingController, public toastController: ToastController,public router: Router,public events : Events, public formBuilder:FormBuilder, public alertController : AlertController) 
  { 
    //this.getUserProfile()
    //this.fetchUserProfile()
    this.events.publish('currentPage:home', false)
    this.events.subscribe('user:created', (email) => {
      if(!email){
        this.router.navigate(['/login'])
      }
    })
    this.profileForm = formBuilder.group({
      name: [this.name, [Validators.compose
        (
        [Validators.required, Validators.pattern(this.namePattern)]
        )
      ]],

      email: [this.email, [Validators.compose
        (
        [Validators.required, Validators.pattern(this.emailPattern)]
        )
      ]]
    })
    this.getUserID()
    this.fetchUserProfile()
  }

  getPic(sourceType)
  {
    const options: CameraOptions =
    {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) =>
    {
      console.log(imageData);
      
      var names = imageData.substring(imageData.lastIndexOf('/') +1,
      imageData.length)

      console.log(names);
      
      if(sourceType == this.camera.PictureSourceType.PHOTOLIBRARY)
      {
        names = names.substring(0, names.lastIndexOf('?'))
      }

      console.log(names);
      
      var dirrectory = imageData.substring(0, imageData.lastIndexOf('/') +1)
      this.file.readAsDataURL(dirrectory, names).then((result) =>
      {
        console.log(result);
        this.image = result
        this.secImage =result
      })

      this.file.readAsArrayBuffer(dirrectory, names).then((buffer) =>
      {
        var blob = new Blob([buffer], {type: "image/jpeg"})

        console.log(buffer);
        console.log(blob.size);
        console.log(blob);

        this.userService.savePic(blob)
      }).then(() =>
      {
        if(sourceType === this.camera.PictureSourceType.CAMERA)
        {

        }
      })
    }, (err) =>
    {

    })
  }

  async selectPic()
  {
    const actionSheet = await this.actionSheetController.create(
      {
        header: "Select image source",
        buttons: [{text: "Gallery", handler:() =>
      {
        this.getPic(this.camera.PictureSourceType.PHOTOLIBRARY)
      }},
    {
      text: "Camera", handler:() =>
      {
        this.getPic(this.camera.PictureSourceType.CAMERA)
      }
    },
  {
    text: "Cancel",
    role: 'cancel'
  }]
      }
    )

    await actionSheet.present()
  }

  
  updateProfile()
  {
    this.email = this.profileForm.get('email').value
    this.name = this.profileForm.get('name').value
  }    

  getUserProfile(){
    this.user = this.userService.returnUserProfile()
    console.log(this.user);
  }

  getUserID(){
    
  }
   async fetchUserProfile(){
    const loader = await this.loader.create(
      {
        message: 'Loading profile...'
      }
    )

    await loader.present()
    this.userService.checkingAuthState().then(data => {
      this.user = data
      console.log(this.user);
      let userID = this.user['uid']
      console.log(userID);
      this.userService.getUserProfile(userID).then(data =>
      
      
      
        {
          console.log(userID);
          console.log(data);
        // this.name = data.name
        // this.email = data.email
        this.profileForm.get('email').setValue(data.email)
        this.profileForm.get('name').setValue(data.name)
        this.events.publish('user:loggedIn', (data.email))
        this.image = data.profilePicUrl
          console.log(data.profilePicUrl);
          
            loader.dismiss()
          
          
        })
      
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Profile Updated Successfully!',
      duration: 1000,
      color: "tertiary"
    });
    toast.present();
  }
  ngOnInit() {


  }

  update(){
    let newUsername = this.profileForm.get('name').value
    let newEmail = this.profileForm.get('email').value
    console.log(newEmail);
    
    this.userService.checkingAuthState().then(data => {
      console.log(data);
      let result  = data
      let userID = result['uid']
      let email  = result['email']
      let username = result['name']
      console.log(userID);
      if(newEmail !== email){
        this.loginAlert(userID, newUsername, username, newEmail, email).then(data => {
          console.log(data);
          
        })
      }else{
        this.userService.updateProfile(userID, newUsername, username, newEmail, email).then(data=>{
          console.log(data);
          
        })
      }
      
        
        

    
    })
  }
  
  async loginAlert(userID, newUsername, username, newEmail, email){
    
    const alert = await this.alertController.create({
      header: 'Prompt!',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Email'
        },
        {
          name: 'password',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok');
            console.log(data.email);
            console.log(data.password);
            let currentUserEmail = data.email
            let currentUserPassword = data.password
            return this.userService.login(currentUserEmail, currentUserPassword).then(data => {
              console.log(data);
              let returned = data
              if(returned.operationType === "signIn"){
                this.userService.updateProfile(userID, newUsername, username, newEmail, email).then(data => {
                  console.log(data);
                  
                })
              }
              
            }).catch(error=>{
              console.log(error);
              
            })
          }
        }
      ]
    });
    await alert.present()
  }
  addImage(){
    const options: CameraOptions =
    {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      //encodingType: this.camera.EncodingType.JPEG,
      //mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then(imageData => {
      this.secImage = 'data:image/jpeg;base64' + imageData
      console.log(this.secImage);
      
    })
  }

    
}
