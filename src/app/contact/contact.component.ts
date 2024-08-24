import { Component, OnDestroy } from '@angular/core';
import { PropertySharingService } from '../property-sharing.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnDestroy {
  contactView : boolean
  gmail='cppraveen02@gmail.com'
  constructor(
    private propShare: PropertySharingService
  ) {
    propShare.contactView = false
    this.contactView = propShare.contactView
  }
  ngOnDestroy(): void {
    this.propShare.contactView = true
  }
  
}
