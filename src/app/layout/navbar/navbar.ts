import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})


export class Navbar {
  activeSection: string = 'welcome-section';

  @HostListener('window:scroll')
  onScroll() {
    const sections = ['welcome-section', 'qa-ranking-section', 'sopa-letras-section', 'qa-ranking'];
    const scrollPosition = window.scrollY + 150; // Offset para header

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop;
        const height = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
          this.activeSection = sectionId;
          break;
        }
      }
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Ajustar según altura del header
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  isActive(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }
}
