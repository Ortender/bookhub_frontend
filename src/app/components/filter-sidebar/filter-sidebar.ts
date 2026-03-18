import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './filter-sidebar.html',
  styleUrl: './filter-sidebar.css',
})
export class FilterSidebar {
  // Définition de l'émetteur d'événements pour envoyer les filtres au composant parent
  // Le nom 'filterChange' doit correspondre à celui utilisé dans le template parent (catalogue.html)
  @Output() filterChange = new EventEmitter<any>();

  /**
   * Méthode pour envoyer les filtres sélectionnés au composant parent.
   * Cette méthode doit être appelée depuis le template HTML (ex: lors d'un clic sur une checkbox)
   */
  sendFiltersToParent(filters: any): void {
    console.log('Envoi des filtres au parent :', filters);
    // Emission de l'événement avec les données de filtrage
    this.filterChange.emit(filters);
  }

  /**
   * Méthode locale (optionnelle) pour traiter les filtres avant de les transmettre
   */
  applyFilters(filters: any): void {
    console.log('Filtres reçus localement :', filters);
    this.sendFiltersToParent(filters);
  }

  // À ajouter dans votre classe FilterSidebar

// Pour gérer la disponibilité
  onToggleDispo(event: any): void {
    const isChecked = event.target.checked;
    this.sendFiltersToParent({ type: 'dispo', value: isChecked });
  }

// Pour gérer les catégories
  onToggleCategory(category: string, event: any): void {
    const isChecked = event.target.checked;
    this.sendFiltersToParent({ type: 'category', name: category, active: isChecked });
  }
}
