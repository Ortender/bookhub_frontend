import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { NotificationComponent } from './components/notification-component/notification-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, NotificationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bookhub-frontend');
}
