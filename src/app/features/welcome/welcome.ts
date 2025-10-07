import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})

export class Welcome {
  
  
  scrollToQaRanking() {
    const element = document.getElementById('qa-ranking-section');
    if (element) {
      const headerHeight = 80; // Ajustar según altura del header
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }
}
