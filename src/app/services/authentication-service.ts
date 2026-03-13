import { HttpClient} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

/**
 * Service responsable de la gestion de l'authentification des utilisateurs.
 * Il permet notamment :
 * - l'inscription d'un utilisateur
 * - l'authentification auprès du serveur d'application
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  
  private readonly BASE_URL : string = environment.apiUrl;
  private httpService : HttpClient = inject(HttpClient);

  /**
   * Inscrit un nouvel utilisateur sur la plateforme.
   *
   * @param userName email de l'utilisateur
   * @param password mot de passe de l'utilisateur
   * @returns Observable contenant un message d'erreur éventuel
   */
  public register(lastName : string, firstName : string, email : string, password : string, gdpr : boolean) {
    return this.httpService.post(`${this.BASE_URL}/auth/register`, {email : email, nom : lastName, prenom : firstName, password :password, accordRgpd : gdpr})
  }
}
