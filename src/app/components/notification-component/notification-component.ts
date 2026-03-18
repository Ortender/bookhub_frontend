import { Component, inject } from '@angular/core';
import { NotificationService } from '../../services/notification-service';
import { AsyncPipe } from '@angular/common';


/**
 * Composant responsable de l'affichage des notifications dans l'application.
 *
 * Il s'abonne au flux de notifications fourni par le NotificationService
 * et affiche les messages (succès, erreur, information) à l'utilisateur.
 *
 * Le composant utilise l'AsyncPipe afin de gérer automatiquement
 * l'abonnement et le désabonnement à l'Observable de notification.
 */
@Component({
  selector: 'app-notification-component',
  imports: [AsyncPipe],
  templateUrl: './notification-component.html',
  styleUrl: './notification-component.css',
})
export class NotificationComponent {
    /**
   * Service de gestion des notifications.
   * Il permet d'accéder au flux de notifications à afficher dans l'interface.
   */
  public notificationService : NotificationService = inject(NotificationService)
}
