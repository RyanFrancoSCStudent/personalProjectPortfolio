import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet, Router } from '@angular/router';

import { ContactComponent } from './component/contact/contact';
import { Home } from './component/home/home';
import { About } from './component/about/about';
import { Footer } from './component/footer/footer';
import { Skills } from './component/skills/skills';
import { Passtimes } from './component/passtimes/passtimes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterOutlet,
    Home,
    About,
    Skills,
    Passtimes,
    ContactComponent,
    Footer
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  protected readonly title = signal('ryanfrancoportfolio');

  constructor(private router: Router) {}

  isProjectsPage() {
    return this.router.url.startsWith('/projects');
  }

goToSection(sectionId: string) {

  if (this.router.url.startsWith('/projects')) {
    this.router.navigateByUrl('/').then(() => {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    });
  } else {
   
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}


  
}
