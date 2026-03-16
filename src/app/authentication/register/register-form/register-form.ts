import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication-service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification-service';

/**
 * Composant responsable de la gestion du formulaire d'inscription.
 *
 * Il permet à un utilisateur de créer un compte en saisissant ses informations
 * personnelles (nom, prénom, email, mot de passe) et en acceptant les conditions RGPD.
 *
 * Le composant utilise les **Reactive Forms** afin de gérer la validation
 * et la soumission des données au service d'authentification.
 */
@Component({
  selector: 'app-register-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {

    /**
   * Service permettant de communiquer avec l'API d'authentification
   * pour inscrire un nouvel utilisateur.
   */
  private authenticationService : AuthenticationService = inject(AuthenticationService);

    /**
   * Service de navigation Angular permettant de rediriger l'utilisateur
   * vers une autre page après l'inscription.
   */
  private router : Router = inject (Router);

    /**
   * Service permettant d'afficher des notifications dans l'interface utilisateur.
   */
  private notificationService : NotificationService = inject(NotificationService);

    /**
   * Indique si le formulaire a déjà été soumis.
   * Permet d'afficher les messages de validation après tentative d'envoi.
   */
  submitted : boolean = false;

    /**
   * Formulaire d'inscription utilisant Reactive Forms.
   *
   * Il contient les champs :
   * - nom
   * - prénom
   * - email
   * - mot de passe
   * - acceptation des conditions RGPD
   *
   * Chaque champ possède ses propres règles de validation.
   */
  public registerForm : FormGroup = new FormGroup ({
    lastName : new FormControl('', [Validators.required, Validators.maxLength(150)]),
    firstName : new FormControl('', [Validators.required, Validators.maxLength(150)]),
    email : new FormControl('',[Validators.required, Validators.maxLength(250), Validators.email]),
    password : new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{12,}$/), Validators.maxLength(255)]),
    gdpr : new FormControl(false , Validators.requiredTrue)
  })

    /**
   * Vérifie si un champ du formulaire contient une erreur spécifique.
   *
   * Cette méthode est utilisée dans le template pour afficher
   * les messages d'erreur de validation.
   *
   * L'erreur est affichée uniquement si :
   * - le champ contient l'erreur demandée
   * - le champ a été modifié, touché ou le formulaire soumis
   *
   * @param controlName Nom du champ dans le formulaire
   * @param errorName Nom de l'erreur de validation
   * @returns true si l'erreur doit être affichée
   */
  hasError(controlName: string, errorName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control && control.hasError(errorName) && (control.touched || control.dirty || this.submitted));
  }

    /**
   * Soumet le formulaire d'inscription.
   *
   * Si le formulaire est valide :
   * - les données sont envoyées au service d'authentification
   * - un message de succès est affiché
   * - l'utilisateur est redirigé vers la page de connexion
   *
   * Si le formulaire est invalide :
   * - tous les champs sont marqués comme "touchés" afin d'afficher les erreurs
   */
  public registerUser(){
    this.submitted = true;

    if(this.registerForm.valid){
      const { lastName, firstName, email, password, gdpr } = this.registerForm.getRawValue()
      this.authenticationService.register(lastName, firstName, email, password, gdpr).subscribe({
        next : (response) => {
          this.notificationService.success($localize `Votre compte a bien été créé`);
          this.router.navigate(['/login'])},
        error: (err) => this.notificationService.error($localize `Une erreure est survenue, le compte n'a pas pu être créé`)
      })
    } else {
      this.registerForm.markAllAsTouched();
      return;
    }
  }

}
