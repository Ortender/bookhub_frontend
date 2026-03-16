import { Injectable } from '@angular/core';
import { NotificationMessage } from '../interfaces/notification-message';
import { BehaviorSubject } from 'rxjs';

/**
 * Service responsable de la gestion des notifications dans l'application.
 *
 * Ce service permet d'afficher des messages d'information à l'utilisateur
 * (succès, erreur, information) et de les diffuser aux composants abonnés.
 *
 * Il repose sur un BehaviorSubject afin de permettre aux composants Angular
 * d'observer les changements de notification en temps réel.
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  
    /**
   * Subject contenant la notification courante.
   * Il peut contenir un message ou `null` lorsqu'aucune notification n'est active.
   */
  private notificationSubject = new BehaviorSubject<NotificationMessage | null>(null);

    /**
   * Observable exposé aux composants afin qu'ils puissent s'abonner
   * aux changements de notification.
   */
  public notification$ = this.notificationSubject.asObservable();

    /**
   * Affiche une notification.
   *
   * La notification est diffusée à tous les composants abonnés.
   * Elle est automatiquement supprimée après 6 secondes.
   *
   * @param message Objet contenant le type et le texte de la notification
   */
  public show(message: NotificationMessage): void {
    this.notificationSubject.next(message);

    setTimeout(() => {
      this.clear();
    }, 6000);
  }

    /**
   * Supprime la notification actuellement affichée.
   * Diffuse `null` aux observateurs pour indiquer qu'il n'y a plus de message.
   */
  public clear(): void {
    this.notificationSubject.next(null);
  }

    /**
   * Affiche une notification de succès.
   *
   * @param text Texte de la notification
   */
  public success(text: string): void {
    this.show({ type: 'success', text });
  }

    /**
   * Affiche une notification d'erreur.
   *
   * @param text Texte de la notification
   */
  public error(text: string): void {
    this.show({ type: 'error', text });
  }

    /**
   * Affiche une notification d'information.
   *
   * @param text Texte de la notification
   */
  public info(text: string): void {
    this.show({ type: 'info', text });
  }
}
