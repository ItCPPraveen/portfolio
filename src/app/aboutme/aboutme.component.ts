import { Component, OnInit } from '@angular/core';
import { GoogleSheetsService } from '../google-sheets.service';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit {
  bio_1 = 'I excel at crafting user-friendly, responsive, and high-performance websites that deliver exceptional digital experiences. As an Angular Developer at a leading crypto exchange platform, I build scalable and intuitive web applications designed to handle millions of users seamlessly.';
  bio_2 = 'My passion lies in solving complex problems through clean, efficient code and continuously expanding my skill set to stay ahead in the fast-paced world of web development. Whether it’s creating seamless user experiences or optimizing performance, I thrive on turning ideas into reality.';

  constructor(private sheetsService: GoogleSheetsService) {}

  ngOnInit(): void {
    this.sheetsService.getAboutData().subscribe({
      next: (data) => {
        if (data['bio_1']) this.bio_1 = data['bio_1'];
        if (data['bio_2']) this.bio_2 = data['bio_2'];
      },
      error: (err) => {
        console.error('Error loading about info:', err);
      }
    });
  }
}
