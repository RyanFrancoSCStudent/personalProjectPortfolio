import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {             // ✅ Class name should match Angular conventions
  email = 'codearchitect414@gmail.com';
  linkedin = 'https://www.linkedin.com/in/ryan-franco-139084269/';
  github = 'https://github.com/RyanFrancoSCStudent';
  message = 'Feel free to reach out! ';
}