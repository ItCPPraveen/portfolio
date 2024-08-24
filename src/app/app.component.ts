import { Component } from '@angular/core';
import { PropertySharingService } from './property-sharing.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio';
  contactView:boolean | undefined
  constructor(
    private router : Router,
    private propShare : PropertySharingService
  ){
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        this.contactView = ev.url == '/contact'
        console.log(this.contactView);    
      }
    });
    console.log(this.contactView);
    
  }
}
