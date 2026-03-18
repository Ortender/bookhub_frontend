import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { FilterSidebar } from '../filter-sidebar/filter-sidebar';
import { BookListComponent } from '../book-list/book-list';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    FilterSidebar,
    BookListComponent
  ],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css'
})
export class CatalogueComponent implements OnInit {
  // Liste des livres récupérés du backend Java
  books: Book[] = [];

  // États de filtrage actuels
  searchTerm: string = '';
  isAvailable: boolean = false;
  selectedCategories: string[] = [];

  constructor(
    private bookService: BookService, // Injection du service pour l'API
    private router: Router,             // Injection du routeur pour la navigation
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Chargement initial des données au démarrage
    this.fetchBooks();
  }

  /**
   * Méthode principale : appelle le backend Java via le service
   */
  fetchBooks(): void {
    this.bookService.getBooks(this.searchTerm, this.isAvailable, this.selectedCategories)
      .subscribe({
        next: (data : any[]) => {
          this.books = data;
          this.cdr.detectChanges();
        },
        error: (err : any[]) => console.error('Erreur lors du chargement des livres', err)
      });
  }

  /**
   * Reçoit le mot-clé depuis le SearchBarComponent
   */
  onSearch(keyword: string): void {
    this.searchTerm = keyword;
    this.fetchBooks();
  }

  /**
   * Reçoit l'objet complet des filtres depuis FilterSidebar
   */
  applyFilters(filters: any): void {
    this.isAvailable = filters.available;
    this.selectedCategories = filters.categories;
    this.fetchBooks(); // Rafraîchit la liste avec les nouveaux filtres
  }

  /**
   * Effectue la redirection vers la page de détails.
   */
  viewDetails(bookId: string | number): void {
    this.router.navigate(['/book', bookId]);
  }
}
