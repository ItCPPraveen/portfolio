import { Component, OnInit } from '@angular/core';
import { GoogleSheetsService, Project } from '../google-sheets.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  loading = true;

  constructor(private sheetsService: GoogleSheetsService) {}

  ngOnInit(): void {
    this.sheetsService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading projects:', err);
        this.loading = false;
      }
    });
  }
}

