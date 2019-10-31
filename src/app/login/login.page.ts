import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { AlertController, Events } from '@ionic/angular';
import { Router } from '@angular/router'
import {FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string
  password: string
  emailPattern : string = "[a-zA-Z0-9-_.+#$!=%^&*/?]+[@][a-zA-Z0-9-]+[.][a-zA-Z0-9]+"
  passwordPattern = "^(?=.*\[0-9])(?=.*\[a-z])(?=.*\[A-Z])(?=.*\[@#$!%^&*,.<>]).{8,}$"
  loginForm
  constructor(
    public userService: UsersService,
    public alertController: AlertController,
    public route: Router,
    public formBuilder: FormBuilder,
    public events : Events,
    ) {
      this.events.publish('currentPage:home', false)
      this.loginForm = formBuilder.group({
    
      email: [this.email, Validators.compose(
        [Validators.required, Validators.pattern(this.emailPattern)]
      )],
      password: [this.password, Validators.compose(
        [Validators.required, Validators.pattern(this.passwordPattern)]
      )]
    })
  //  this.loginForm.get('email').setValue('willington.mnisi@gmail.com')
  //  this.loginForm.get('password').setValue('Will1ngt0n7&')
  }
  
  login(){
    this.email = this.loginForm.get('email').value
    this.password = this.loginForm.get('password').value
    console.log(this.email, this.password)
    this.userService.login(this.email, this.password).then((result) =>{
      if(result.operationType === "signIn"){
        this.events.publish('user:loggedIn', result.user.email);
        console.log("Welcome " + result.user.email)
        let link = "home"
        this.route.navigate([link])
        console.log('why are you running again?');
      }else{
        this.invalidPassword(result)
      }
    })
  }

  async invalidPassword(result) {
    const alert = await this.alertController.create({
      header: "Alert",
      message: result,
      buttons: ['OK']
    })
    await alert.present()
  }
  //Resetting user password using email password reset request
  async resetPassword() {
    const alert = await this.alertController.create({
      header: 'Reset Password',
      message: 'Are ypou sure you want to reset your password?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'success',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Yes',
        handler: (user) => {
          console.log('Confirm Okay');
          this.userService.passwordReset(user.email)
        }
      }]
    });
    await alert.present();
  }
  ngOnInit() {
  }
}
