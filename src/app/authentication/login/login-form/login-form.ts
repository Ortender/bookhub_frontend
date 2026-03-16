import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication-service';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../../services/notification-service';
import { AuthenticationRequest } from '../../../interfaces/authentication/authentication-request';
import { SessionService } from '../../../services/session-service';

/**
 * Composant responsable de la gestion du formulaire de connexion.
 *
 * Il permet à un utilisateur de se connecter à l'application en saisissant
 * son adresse email et son mot de passe.
 *
 * Le composant utilise les **Reactive Forms** pour gérer la validation,
 * la soumission du formulaire et l'intégration avec les services
 * d'authentification, de session et de notification.
 */
@Component({
  selector: 'app-login-form',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {

  /**
   * Service permettant d'envoyer la requête de connexion au backend.
   */
  private authenticationService : AuthenticationService = inject(AuthenticationService);

    /**
   * Service Angular de navigation permettant de rediriger l'utilisateur
   * après une authentification réussie.
   */
  private router : Router = inject (Router);

    /**
   * Service permettant d'afficher des notifications à l'utilisateur.
   */
  private notificationService : NotificationService = inject(NotificationService);

    /**
   * Service responsable de la gestion de la session utilisateur côté client.
   */
  private sessionService : SessionService = inject(SessionService);

    /**
   * Indique si le formulaire a déjà été soumis.
   * Permet d'afficher les erreurs de validation après une tentative de connexion.
   */
  submitted : boolean = false;

    /**
   * Formulaire de connexion.
   *
   * Il contient les champs :
   * - email
   * - mot de passe
   *
   * Chaque champ possède ses propres règles de validation.
   */
  public loginForm : FormGroup = new FormGroup ({
    email : new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required])
  })

    /**
   * Vérifie si un champ du formulaire contient une erreur spécifique.
   *
   * Cette méthode est utilisée dans le template pour afficher
   * les messages d'erreur de validation.
   *
   * L'erreur est affichée uniquement si :
   * - le champ contient l'erreur demandée
   * - le champ a été touché, modifié ou si le formulaire a déjà été soumis
   *
   * @param controlName Nom du champ du formulaire
   * @param errorName Nom de l'erreur à vérifier
   * @returns true si l'erreur doit être affichée, false sinon
   */
  hasError(controlName: string, errorName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control && control.hasError(errorName) && (control.touched || control.dirty || this.submitted));
  }

    /**
   * Soumet le formulaire de connexion.
   *
   * Si le formulaire est valide :
   * - les identifiants sont extraits du formulaire
   * - une requête d'authentification est envoyée au backend
   * - une notification de succès est affichée
   * - les informations utilisateur sont stockées dans la session
   * - l'utilisateur est redirigé vers la page d'accueil
   *
   * Si le formulaire est invalide :
   * - tous les champs sont marqués comme touchés afin d'afficher les erreurs
   */
  public logUser(){
    this.submitted = true;

    if(this.loginForm.valid){
      const { email, password} = this.loginForm.getRawValue();
      const request : AuthenticationRequest = {
        email : email,
        password : password
      }
      this.authenticationService.login(request).subscribe({
        next: (response) => {
          this.notificationService.success("Vous êtes connecté");
          this.sessionService.setUser(response);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.notificationService.error("échec de la connexion");
          console.log(err);
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
      return;
    }

  }

}
