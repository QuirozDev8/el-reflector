import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Navbar } from './layout/navbar/navbar';
import { Welcome } from './features/welcome/welcome';
import { QaRanking } from './features/qa-ranking/qa-ranking';
import { SopaLetras } from './features/sopa-letras/sopa-letras';
import { Auth } from './features/auth/auth';


@Component({
  selector: 'app-root',
  imports: [ Header, Navbar, Welcome, QaRanking, SopaLetras, Auth],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('el-reflector');
}
