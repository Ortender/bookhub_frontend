import { HttpClient} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ResponseLogin } from '../interfaces/authentication/response-login';
import { AuthenticationRequest } from '../interfaces/authentication/authentication-request';
import { Observable } from 'rxjs';
import { SessionService } from './session-service';

/**
 * Service responsable de la gestion de l'authentification des utilisateurs.
 *
 * Ce service permet de communiquer avec l'API backend pour :
 * - inscrire un nouvel utilisateur
 * - authentifier un utilisateur existant
 *
 * Les appels sont réalisés via HttpClient vers les endpoints d'authentification.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  
    /**
   * URL de base de l'API backend
   */
  private readonly BASE_URL : string = environment.apiUrl;

    /**
   * Service Angular permettant d'effectuer les requêtes HTTP vers l'API
   */
  private httpService : HttpClient = inject(HttpClient);

  private sessionService: SessionService = inject(SessionService);

  /**
   * Inscrit un nouvel utilisateur sur la plateforme.
   *
   * Envoie les informations d'inscription au backend afin de créer un compte utilisateur.
   *
   * @param lastName Nom de l'utilisateur
   * @param firstName Prénom de l'utilisateur
   * @param email Adresse email de l'utilisateur
   * @param password Mot de passe de l'utilisateur
   * @param gdpr Indique si l'utilisateur accepte les conditions RGPD
   * @returns Observable retournant la réponse du serveur
   */
  public register(lastName : string, firstName : string, email : string, password : string, gdpr : boolean) {
    return this.httpService.post(`${this.BASE_URL}/auth/register`, {email : email, nom : lastName, prenom : firstName, password :password, accordRgpd : gdpr})
  }

  /**
   * Authentifie un utilisateur auprès du serveur.
   *
   * Envoie les identifiants de connexion (email et mot de passe) au backend
   * afin d'obtenir un token d'authentification ou les informations de session.
   *   *
   * @param request Objet contenant l'email et le mot de passe de l'utilisateur
   * @returns Observable contenant la réponse d'authentification du serveur
   */
  public login(request: AuthenticationRequest ){
    return this.httpService.post<ResponseLogin>(`${this.BASE_URL}/auth/login`, request)
  }

  public logout() : void {
    this.sessionService.clear();
  }
}
