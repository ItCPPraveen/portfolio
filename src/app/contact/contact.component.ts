import { Component, OnDestroy, OnInit } from '@angular/core';
import { PropertySharingService } from '../property-sharing.service';
import { GoogleSheetsService, ContactItem } from '../google-sheets.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnDestroy, OnInit {
  contactView: boolean;
  gmail = 'cppraveen02@gmail.com';
  contacts: ContactItem[] = [];

  constructor(
    private propShare: PropertySharingService,
    private sheetsService: GoogleSheetsService
  ) {
    propShare.contactView = false;
    this.contactView = propShare.contactView;
  }

  ngOnInit(): void {
    this.sheetsService.getContactData().subscribe({
      next: (data) => {
        this.contacts = data;
        const emailContact = data.find(c => c.platform.toUpperCase() === 'EMAIL');
        if (emailContact) {
          this.gmail = emailContact.value;
        }
      },
      error: (err) => {
        console.error('Error loading contact info:', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.propShare.contactView = true;
  }
}
