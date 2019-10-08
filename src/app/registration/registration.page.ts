import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import {FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router'
import { AlertController, Events } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavigationService } from '../navigation.service';

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
  pageURL

  constructor(
    public userService : UsersService,
    public formBuilder: FormBuilder,
    public route: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    public  navigationService : NavigationService,
    public events: Events) {
      this.events.publish('currentPage:home', false)
      this.pageURL = this.navigationService.returnPageURL()
      console.log(this.pageURL);

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

    console.log(this.email);
    console.log(this.name);
    console.log(this.password);
    console.log(this.confirmPassword);
    
    if(this.password === this.confirmPassword){
      this.userService.register(this.email, this.password, this.name).then((data)=>{
      console.log(data)
          if(data.operationType === "signIn"){
            console.log("signed in")
            let userId = data.user.uid
            console.log("Current user : " + userId)
            if(this.pageURL){
              let link = "/" + this.pageURL
              console.log(link);
              
              this.route.navigate([link])
            }else{
          let link = "home"
          this.route.navigate([link])
          }
            this.presentToast()
          }
        }).catch((error) => {
          console.log(error)
        })

      console.log("passwords match");
      
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
      duration: 1000,
      color: "tertiary"
    });
    toast.present();
  }
  ngOnInit() {
    
  }

}
