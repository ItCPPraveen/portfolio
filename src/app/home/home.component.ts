import { Component, OnInit } from '@angular/core';
import { GoogleSheetsService } from '../google-sheets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name = 'PRAVEEN';
  tagline = 'DEVELOPER';
  bio_1 = 'I am a frontend developer with a passion for Software Engineering. My journey has been guided by an insatiable curiosity and a desire to continuously learn and grow.';

  constructor(private sheetsService: GoogleSheetsService) {}

  ngOnInit(): void {
    this.sheetsService.getAboutData().subscribe({
      next: (data) => {
        if (data['name']) this.name = data['name'].toUpperCase();
        if (data['tagline']) this.tagline = data['tagline'].toUpperCase();
        if (data['bio_1']) this.bio_1 = data['bio_1'];
      },
      error: (err) => {
        console.error('Error loading home info:', err);
      }
    });
  }
}
