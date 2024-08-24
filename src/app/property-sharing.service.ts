import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PropertySharingService {

  constructor(
    private router : Router
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        this.contactView = ev.url == '/contact'
        console.log(this.contactView);    
      }
    });

   }
  contactView = true;
  contactObservable = this.contactView
}
