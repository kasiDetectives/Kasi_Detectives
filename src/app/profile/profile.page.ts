import { Component, OnInit } from '@angular/core';
import { ToastController, Events } from '@ionic/angular';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileForm
  name 
  email
  pics
  user =[]
  namePattern = "^(?=.*\[A-Z])(?=.*\[a-z])(?=.*\[A-Z]).{2,}$"
  emailPattern= "[a-zA-Z0-9-_.+#$!=%^&*/?]+[@][a-zA-Z0-9-]+[.][a-zA-Z0-9]+"

  constructor(public userService : UsersService,public camera:Camera, public toastController: ToastController,public router: Router,public events : Events, public formBuilder:FormBuilder) 
  { 
    this.fetchUserProfile()
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

  getPic()
  {
    const options: CameraOptions =
    {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((ImageData) =>
    {
      let base64Image = this.pics + ImageData
    }, (err) =>
    {

    })
  }
  
  updateProfile()
  {
    this.email = this.profileForm.get('email').value
    this.name = this.profileForm.get('name').value
  }    

  fetchUserProfile(){
  
    this.user = this.userService.returnUserProfile()
    console.log(this.user);
    
    this.name = this.user[0].displayName
    this.email = this.user[0].email

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

}