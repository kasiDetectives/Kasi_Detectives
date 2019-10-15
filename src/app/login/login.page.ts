import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { AlertController, Events } from '@ionic/angular';
import { Router } from '@angular/router'
import {FormBuilder, Validators, CheckboxRequiredValidator} from '@angular/forms'
import { NavigationService } from '../navigation.service';
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
  pageURL = "und"
  boolean
  latitude
  longitude
  constructor(
    public userService: UsersService,
    public alertController: AlertController,
    public route: Router,
    public formBuilder: FormBuilder,
    public navigationService : NavigationService,
    public events : Events,
    ) {
      this.events.publish('currentPage:home', false)
      this.pageURL = this.navigationService.returnPageURL()
      console.log(this.pageURL);
    //this.checkURL()
    this.loginForm = formBuilder.group({
      email: [this.email, Validators.compose(
        [Validators.required, Validators.pattern(this.emailPattern)]
      )],
      password: [this.password, Validators.compose(
        [Validators.required, Validators.pattern(this.passwordPattern)]
      )]
    })
   this.loginForm.get('email').setValue('willington.mnisi@gmail.com')
   this.loginForm.get('password').setValue('Will1ngt0n7&')
  }
  checkURL(){
    if(this.pageURL==="und"){
      this.pageURL = this.navigationService.returnPageURL()
      console.log(this.pageURL);
    }
  }
  login(){
    this.email = this.loginForm.get('email').value
    this.password = this.loginForm.get('password').value
    console.log(this.email, this.password)
    this.userService.login(this.email, this.password).then((result) =>{
      if(result.operationType === "signIn"){
        this.events.publish('user:loggedIn', result.user.email);
        console.log("Welcome " + result.user.email)
        let userId = result.user.uid
        if(this.pageURL==="report-alert" || this.pageURL==="community-event"){
          let link = "/" + this.pageURL
          console.log(link);
          this.route.navigate([link])
        }else{
          let link = "home"
          this.route.navigate([link])
        }
        console.log('why are you running again?');
        if(this.boolean === true){
          console.log(true);
        }
      }else{
        console.log(result.message)
      }
    })
  }
  //Resetting user password using email password reset request
  async resetPassword() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Placeholder 1'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'success',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: (user) => {
            console.log('Confirm Okay');
            this.userService.passwordReset(user.email)
          }
        }
      ]
    });
    await alert.present();
  }
  ngOnInit() {
  }
}
