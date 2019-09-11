import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import {FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  name; email; password; confirmPassword; 
  registrationForm
  emailPattern= "[a-zA-Z0-9-_.+#$!=%^&*/?]+[@][a-zA-Z0-9-]+[.][a-zA-Z0-9]+"
  namePattern = "^(?=.*\[A-Z])(?=.*\[a-z])(?=.*\[A-Z]).{2,}$"
  passwordPattern = "^(?=.*\[0-9])(?=.*\[a-z])(?=.*\[A-Z])(?=.*\[@#$!%^&*,.<>]).{8,}$"
  

  constructor(public userService : UsersService, formBuilder: FormBuilder, public route: Router, public alertController: AlertController, public toastController: ToastController) {
   
    this.registrationForm = formBuilder.group({
      name: [this.name, [Validators.compose(
        [Validators.required, Validators.pattern(this.namePattern)]
      )]],
      email: [this.email, [Validators.compose(
        [Validators.required, Validators.pattern(this.emailPattern)]
      )]],
      password: [this.password,Validators.compose(
        [Validators.required, Validators.pattern(this.passwordPattern)]
      )],
      confirmPassword: [this.confirmPassword, Validators.required]
    })
  }

  addUser(){
    this.email = this.registrationForm.get('email').value
    this.name = this.registrationForm.get('name').value
    this.password = this.registrationForm.get('password').value
    this.confirmPassword = this.registrationForm.get('confirmPassword').value
    if(this.password === this.confirmPassword){
      this.userService.register(this.email, this.password, this.name).then((data)=>{
      console.log(data)
          if(data.operationType === "signIn"){
            console.log("signed in")
            let userId = data.user.uid
            console.log("Current user : " + userId)
            this.userService.setCurrentSession(userId)
            this.route.navigate(["/home", userId])
            this.presentToast()
          }
        }).catch((error) => {
          console.log(error)
        })
    }else if(this.password !== this.confirmPassword){
      this.loadPasswordAlert()
    }
  

  }


  async loadPasswordAlert(){
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Error',
        message: 'Passwords don\'t match',
        buttons: ['OK']
      });
  
      await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'You have been registered',
      duration: 2000,
      color: "primary"
    });
    toast.present();
  }
  ngOnInit() {
    
  }

}
