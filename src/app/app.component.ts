import { Component, HostListener, OnInit } from '@angular/core';
import { PropertySharingService } from './property-sharing.service';
import { NavigationEnd, Router } from '@angular/router';
import { GoogleSheetsService } from './google-sheets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  contactView: boolean | undefined;
  resumeUrl = 'assets/praveenResume.pdf';

  constructor(
    private router: Router,
    private propShare: PropertySharingService,
    private sheetsService: GoogleSheetsService
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.contactView = ev.url == '/contact'
        console.log(this.contactView);
      }
    });
    console.log(this.contactView);

  }

  ngOnInit() {
    this.sheetsService.getAboutData().subscribe({
      next: (data) => {
        if (data['resume_url']) {
          this.resumeUrl = data['resume_url'];
        }
      },
      error: (err) => console.error(err)
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const bg = document.querySelector('.cursor-bg') as HTMLElement;
    setTimeout(() => {
      if (bg) {
        bg.style.left = e.clientX + 'px';
        bg.style.top = e.clientY + 'px';
      }
    }, 100)
    // If you want to dynamically change colour, you could add logic here
    // @HostListener('document:mousemove', ['$event'])
    // onMoveChangeColor(e: MouseEvent) {
    //   const bg = document.querySelector('.cursor-bg') as HTMLElement;
    // if (bg) {
    //   // Example: change color depending on X position
    //   const pct = e.clientX / window.innerWidth;
    //   const r = Math.floor(255 * pct);
    //   const g = Math.floor(255 * (1-pct));
    //   bg.style.background = `rgba(${r},${g},50,0.5)`;
    // }
  }
}
