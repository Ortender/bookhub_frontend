import { Injectable, signal } from '@angular/core';
import { ResponseLogin } from '../interfaces/authentication/response-login';


/**
 * Service responsable de la gestion de la session utilisateur côté client.
 *
 * Il permet de stocker les informations de l'utilisateur actuellement connecté
 * et de les rendre accessibles dans l'ensemble de l'application.
 *
 * Ce service utilise les **Angular Signals** pour permettre aux composants
 * de réagir automatiquement aux changements de session.
 */
@Injectable({
  providedIn: 'root',
})
export class SessionService {

    /**
   * Signal contenant l'utilisateur actuellement connecté.
   * - contient les informations de l'utilisateur après authentification
   * - contient `null` lorsqu'aucun utilisateur n'est connecté
   */
  public currentUser = signal<ResponseLogin | null>(null);

    /**
   * Définit l'utilisateur actuellement connecté.
   *
   * Cette méthode est généralement appelée après une authentification réussie.
   *
   * @param user Informations de l'utilisateur retournées par l'API
   */
  public setUser(user : ResponseLogin): void {
    this.currentUser.set(user);
  }

    /**
   * Réinitialise la session utilisateur.
   *
   * Supprime les informations de l'utilisateur actuellement connecté.
   * Cette méthode est généralement appelée lors d'une déconnexion.
   */
  public clear(): void {
    this.currentUser.set(null)
  }

    /**
   * Indique si un utilisateur est actuellement connecté.
   *
   * @returns true si un utilisateur est présent dans la session, false sinon
   */
  public isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }
  
}
