import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-passtimes',
  imports: [CommonModule],
  templateUrl: './passtimes.html',
  styleUrl: './passtimes.css'
})
export class Passtimes {
  passtimes = [ "Coding, Motocross Racing, Cars, Self Improvement"];

  photos = [ {img: "./images/pic1.jpg"}, 
    {img: "./images/pic2.jpg"}
  ]
}
