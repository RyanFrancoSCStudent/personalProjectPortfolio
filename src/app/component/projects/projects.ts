import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-projects',
  imports: [CommonModule,MatCardModule, Footer],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
    projects = [
    { name: 'The Honorable Tim Burners-Lee', img:"./images/90s.jpeg", Decription: "One of my very first Web projects, 90s Themed Website using links to the wayback machine for period correct sites. "},
    { name: 'attendEase, Attendance App', img:"./images/attendease.png", Decription: "Backend Springboot Application, Using CRUD."  },
    { name: 'Prue Racing Simulator', img:"./images/prueracing.jpeg", Decription: "Local Multiplayer Game, Using Unity, with C#." },
    { name: 'calcuServe', img:"./images/java.png", Decription: "Java Calculator, Using OOP Techniques" }
    ]
}
