import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from "@angular/router";
import { SessionService } from '../services/session-service';

/**
 * Composant représentant l'en-tête de l'application.
 *
 * Ce composant affiche les éléments de navigation principaux
 * et permet d'accéder aux différentes pages de l'application.
 *
 * Il est également responsable de la gestion de la déconnexion
 * de l'utilisateur via le bouton "logout".
 *
 * Le composant s'appuie sur le SessionService pour connaître
 * l'état de la session utilisateur et sur le Router pour gérer
 * la navigation dans l'application.
 */
@Component({
  selector: 'app-header',
  imports: [RouterModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  public router : Router = inject(Router);
  readonly sessionService : SessionService = inject(SessionService);

  /**
   * Déconnecte l'utilisateur courant.
   *
   * Supprime les informations de session côté client
   * puis redirige l'utilisateur vers la page de connexion.
  */
  public logout(){
    this.sessionService.logout();
    this.router.navigate(['/login']);
  }

}
