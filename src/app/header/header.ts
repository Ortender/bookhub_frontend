import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from "@angular/router";
import { SessionService } from '../services/session-service';
import { AuthenticationService } from '../services/authentication-service';
import { NotificationService } from '../services/notification-service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  public router : Router = inject(Router);
  readonly sessionService : SessionService = inject(SessionService);
  private notificationService :  NotificationService = inject(NotificationService);
  private authenticationService : AuthenticationService = inject(AuthenticationService);

  public logout(){
    this.authenticationService.logout().subscribe({
      next : () => {
        this.sessionService.clear();
        this.router.navigate(['/']);},
      error: () => {
        this.notificationService.error("échec de la déconnexion")
      }
    })
  }

}
