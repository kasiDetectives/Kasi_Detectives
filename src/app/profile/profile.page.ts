import { Component, OnInit } from '@angular/core';
import { ToastController, Events } from '@ionic/angular';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileForm
  name 
  email
  namePattern = "^(?=.*\[A-Z])(?=.*\[a-z])(?=.*\[A-Z]).{2,}$"
  emailPattern= "[a-zA-Z0-9-_.+#$!=%^&*/?]+[@][a-zA-Z0-9-]+[.][a-zA-Z0-9]+"

  constructor(public toastController: ToastController,public router: Router,public events : Events, public formBuilder:FormBuilder) 
  { 
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
  
  updateProfile()
  {
    this.email = this.profileForm.get('email').value
    this.name = this.profileForm.get('name').value
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
