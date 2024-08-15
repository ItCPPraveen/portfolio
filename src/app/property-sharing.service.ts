import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertySharingService {

  constructor() { }
  contactView = true;
  contactObservable = this.contactView
}
