import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-crime-alert',
  templateUrl: './crime-alert.page.html',
  styleUrls: ['./crime-alert.page.scss'],
})
export class CrimeAlertPage implements OnInit {
  
  constructor(public navigationService : NavigationService) { }
  
  ngOnInit() {
  }

}
