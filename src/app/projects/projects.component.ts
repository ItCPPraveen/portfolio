import { Component } from '@angular/core';

interface Project {
  title: string;
  subtitle: string;
  role: string;
  timeline?: string;
  description: string;
  achievements: string[];
  tags: string[];
  links?: { name: string; url: string; icon: string }[];
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects: Project[] = [
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

