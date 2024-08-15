import { Component } from '@angular/core';
import { PropertySharingService } from './property-sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio';
  contactView:boolean
  constructor(
    private propShare : PropertySharingService
  ){
    this.contactView = propShare.contactView
    console.log(this.contactView);
    
  }
}
