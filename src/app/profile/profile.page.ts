import { Component, OnInit } from '@angular/core';
import { ToastController, Events, ActionSheetController, LoadingController } from '@ionic/angular';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UsersService } from '../users.service';
import * as firebase from 'firebase'
import { promise } from 'protractor';
import { resolve } from 'dns';
import { reject } from 'q';
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
  user =[]
  namePattern = "^(?=.*\[A-Z])(?=.*\[a-z])(?=.*\[A-Z]).{2,}$"
  emailPattern= "[a-zA-Z0-9-_.+#$!=%^&*/?]+[@][a-zA-Z0-9-]+[.][a-zA-Z0-9]+"
  image: any;
  secImage

  constructor(public file:File, public actionSheetController:ActionSheetController, public userService : UsersService,public camera:Camera, public loader:LoadingController, public toastController: ToastController,public router: Router,public events : Events, public formBuilder:FormBuilder) 
  { 
    //this.getUserProfile()
    //this.fetchUserProfile()
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

  // getUserProfile(){
  //   this.user = this.userService.returnUserProfile()
  //   console.log(this.user);
  // }
  //  async fetchUserProfile(){
  //   const loader = await this.loader.create(
  //     {
  //       message: 'Loading profile...'
  //     }
  //   )

  //   await loader.present()
  //   this.userService.getUserProfile(this.user[0].key).then(data =>
      
      
      
  // getUserProfile(){
  //       console.log(this.user[0].key);
  //       console.log(data);
  //     // this.name = data.name
  //     // this.email = data.email
  //     this.profileForm.get('email').setValue(data.email)
  //     this.profileForm.get('name').setValue(data.name)
  //     this.image = data.profilePicUrl
  //       this.loader.dismiss()
  //     })






    
    
  
  //   // this.userService.getUserProfile(this.user[0].key).then( profile =>{
  //   //   this.image = profile.profilePicUrl
      
  //   // })

  // }

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
