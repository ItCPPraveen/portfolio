import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Project {
  title: string;
  subtitle: string;
  role: string;
  timeline?: string;
  description: string;
  achievements: string[];
  tags: string[];
  links?: { name: string; url: string; icon: string }[];
}

export interface ContactItem {
  platform: string;
  value: string;
  url: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsService {
  // Replace this placeholder with your actual Google Sheet ID
  private spreadsheetId = '1X0MqrI639SdzYPWfFnZ7Q4rFLH8PVI6c827ZGgxILRg';

  constructor(private http: HttpClient) { }

  /**
   * Helper to parse CSV lines while preserving commas inside quotes.
   */
  private parseCsv(csvText: string): string[][] {
    const lines: string[][] = [];
    const rawLines = csvText.split(/\r?\n/);

    for (const line of rawLines) {
      if (!line.trim()) continue;

      const row: string[] = [];
      let insideQuote = false;
      let entry = '';

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          insideQuote = !insideQuote;
        } else if (char === ',' && !insideQuote) {
          row.push(entry.trim());
          entry = '';
        } else {
          entry += char;
        }
      }
      row.push(entry.trim());

      // Clean up outer quotes and handle double quotes
      const cleanedRow = row.map(val => {
        let v = val.trim();
        if (v.startsWith('"') && v.endsWith('"')) {
          v = v.substring(1, v.length - 1);
        }
        return v.replace(/""/g, '"');
      });

      lines.push(cleanedRow);
    }
    return lines;
  }

  /**
   * Get values from the 'About' tab.
   */
  getAboutData(): Observable<Record<string, string>> {
    const url = `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/gviz/tq?tqx=out:csv&sheet=About`;

    return this.http.get(url, { responseType: 'text' }).pipe(
      map(csv => {
        const parsed = this.parseCsv(csv);
        const data: Record<string, string> = {};
        // Skip header row
        for (let i = 1; i < parsed.length; i++) {
          const row = parsed[i];
          if (row.length >= 2) {
            data[row[0]] = row[1];
          }
        }
        return data;
      }),
      catchError(() => {
        console.warn('Google Sheets API unavailable, falling back to offline About data.');
        return of(this.getFallbackAboutData());
      })
    );
  }

  /**
   * Get projects from the 'Projects' tab.
   */
  getProjects(): Observable<Project[]> {
    const url = `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/gviz/tq?tqx=out:csv&sheet=Projects`;

    return this.http.get(url, { responseType: 'text' }).pipe(
      map(csv => {
        const parsed = this.parseCsv(csv);
        const projects: Project[] = [];
        if (parsed.length <= 1) return projects;

        const headers = parsed[0].map(h => h.toLowerCase());

        for (let i = 1; i < parsed.length; i++) {
          const row = parsed[i];
          const project: any = {};

          headers.forEach((header, index) => {
            project[header] = row[index] || '';
          });

          // Parse achievements (semicolon separated list)
          const achievements = project.achievements
            ? project.achievements.split(';').map((item: string) => item.trim()).filter((item: string) => item.length > 0)
            : [];

          // Parse tags (semicolon separated list)
          const tags = project.tags
            ? project.tags.split(';').map((item: string) => item.trim()).filter((item: string) => item.length > 0)
            : [];

          // Format links
          const links = [];
          if (project.github_url) {
            links.push({ name: 'GitHub Source', url: project.github_url, icon: 'fa-github' });
          } else if (project.portfolio_url) {
            links.push({ name: 'Portfolio', url: project.portfolio_url, icon: 'fa-github' });
          }

          projects.push({
            title: project.title,
            subtitle: project.subtitle,
            role: project.role,
            timeline: project.timeline || undefined,
            description: project.description,
            achievements,
            tags,
            links: links.length > 0 ? links : undefined
          });
        }
        return projects;
      }),
      catchError(() => {
        console.warn('Google Sheets API unavailable, falling back to offline Projects data.');
        return of(this.getFallbackProjects());
      })
    );
  }

  /**
   * Get contact cards from the 'Contact' tab.
   */
  getContactData(): Observable<ContactItem[]> {
    const url = `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/gviz/tq?tqx=out:csv&sheet=Contact`;

    return this.http.get(url, { responseType: 'text' }).pipe(
      map(csv => {
        const parsed = this.parseCsv(csv);
        const contacts: ContactItem[] = [];
        if (parsed.length <= 1) return contacts;

        const headers = parsed[0].map(h => h.toLowerCase());

        for (let i = 1; i < parsed.length; i++) {
          const row = parsed[i];
          const contact: any = {};

          headers.forEach((header, index) => {
            contact[header] = row[index] || '';
          });

          contacts.push({
            platform: contact.platform,
            value: contact.value,
            url: contact.url,
            icon: contact.icon
          });
        }
        return contacts;
      }),
      catchError(() => {
        console.warn('Google Sheets API unavailable, falling back to offline Contact data.');
        return of(this.getFallbackContact());
      })
    );
  }

  // --- Fallback Data sets ---
  private getFallbackAboutData(): Record<string, string> {
    return {
      name: 'PRAVEEN',
      tagline: 'FRONTEND DEVELOPER',
      bio_1: 'Frontend Developer with 2+ years of experience developing scalable web applications using Angular, React, TypeScript, JavaScript, HTML, CSS, and RxJS. Experienced in building real-time applications using WebSockets and integrating REST APIs and GraphQL services.',
      bio_2: 'Worked on enterprise applications in FinTech and Cryptocurrency Exchange platforms with focus on performance optimization, UI development, API integration, and application maintenance. Familiar with Java, Spring Boot, Node.js, MySQL, Git, Jenkins, Redux, and Agile development practices.',
      resume_url: 'assets/praveenResume.pdf'
    };
  }

  private getFallbackProjects(): Project[] {
    return [
      {
        title: 'Zodeak',
        subtitle: 'Innblockchain',
        role: 'Frontend Developer',
        timeline: 'Mar 2024 – Present',
        description: 'A scalable, secure, and high-performance cryptocurrency exchange platform designed to handle live trading data and transaction processing for millions of active users.',
        achievements: [
          'Developed and maintained highly responsive frontend trading applications using Angular, React, TypeScript, HTML, CSS, and JavaScript.',
          'Implemented real-time features using WebSockets and RxJS to deliver live trading order books, price feeds, and instant market updates.',
          'Integrated REST APIs and GraphQL services for robust, efficient communication between frontend UI components and backend microservices.',
          'Participated in core framework upgrades and migration activities to transition services from Angular to React.',
          'Collaborated closely with backend teams working on Java and Spring Boot microservices to define API specifications.',
          'Integrated payment gateway services and secure authentication/authorization modules using JWT and OAuth 2.0.'
        ],
        tags: ['Angular', 'React', 'TypeScript', 'WebSockets', 'RxJS', 'GraphQL', 'REST API', 'JWT', 'OAuth 2.0', 'Spring Boot', 'Java'],
      },
      {
        title: 'Spotify Clone',
        subtitle: 'Personal Project',
        role: 'Full-Stack Developer',
        description: 'A comprehensive, production-ready music discovery and management platform that integrates search and streaming across YouTube and Spotify API sources, featuring mobile gesture controls and a smart caching system.',
        achievements: [
          'Implemented a Database-First caching strategy using NestJS and MongoDB (with optional Redis caching) to store search results with 24-hour TTL expiration, dramatically reducing API rate limit hits.',
          'Managed reactive frontend state using NgRx (Store, Actions, Selectors, and Effects) for predictable audio state, playlist imports, and user queues.',
          'Developed a gesture-based user experience using HammerJS to support mobile swipe-to-queue functionality on song cards.',
          'Created a secure Google OAuth2 login and JWT-based stateless authentication flow for session management.',
          'Built an automated playlist migration module supporting import of public playlists via YouTube/Spotify URLs with robust pagination and rate-limit retry logic.'
        ],
        tags: ['Angular 17', 'NestJS', 'MongoDB', 'Redis', 'NgRx', 'RxJS', 'TypeScript', 'Google OAuth2', 'HammerJS', 'REST API'],
        links: [
          { name: 'GitHub Source', url: 'https://github.com/ItCPPraveen', icon: 'fa-github' }
        ]
      },
      {
        title: 'Reusable UI Component Library',
        subtitle: 'Garrett Advancing Motion',
        role: 'Component Library Developer Intern',
        timeline: 'Jan 2023 – Jun 2023',
        description: 'Developed and standardized a reusable, accessible UI component library for Garrett Advancing Motion to streamline product development across internal enterprise engineering teams.',
        achievements: [
          'Developed modular, responsive frontend components using Angular, TypeScript, HTML, and CSS to guarantee consistent UI styling.',
          'Built and documented high-quality component APIs to simplify integration, speeding up frontend development cycles across teams.',
          'Collaborated with designers and developers to standardize UI/UX practices and maintain cross-component accessibility guidelines.'
        ],
        tags: ['Angular', 'TypeScript', 'HTML5', 'CSS3', 'JavaScript', 'Git'],
      }
    ];
  }

  private getFallbackContact(): ContactItem[] {
    return [
      {
        platform: 'EMAIL',
        value: 'cppraveen02@gmail.com',
        url: 'mailto:cppraveen02@gmail.com',
        icon: 'fa-envelope'
      },
      {
        platform: 'GITHUB',
        value: 'ItCPPraveen',
        url: 'https://github.com/ItCPPraveen',
        icon: 'fa-github'
      },
      {
        platform: 'LINKEDIN',
        value: 'Cp Praveen',
        url: 'https://www.linkedin.com/in/cp-praveen-84218b190',
        icon: 'fa-linkedin'
      },
      {
        platform: 'PHONE',
        value: '+91 70924 34298',
        url: 'tel:+917092434298',
        icon: 'fa-phone'
      }
    ];
  }
}
