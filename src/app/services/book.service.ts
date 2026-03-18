import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model'; // Assurez-vous d'importer le modèle Book

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // Chemin vers les données Mock (le fichier doit être dans le dossier /public)
  private readonly jsonUrl = 'books.json';

  // URL réelle de l'API (commentée pour le moment pour utiliser les données Mock)
  // private readonly apiUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

  /**
   * Méthode principale : Récupère la liste des livres.
   * En phase Mock, elle retourne le contenu du fichier JSON local.
   * Les paramètres query, available et categories sont conservés pour la compatibilité.
   */
  getBooks(query: string = '', available: boolean = false, categories: string[] = []): Observable<Book[]> {
    // En mode Mock, nous effectuons une requête GET sur le fichier JSON local
    return this.http.get<Book[]>(this.jsonUrl);
  }

  /**
   * Récupère les détails d'un livre spécifique via Mock.
   */
  getBookById(id: string | number): Observable<Book> {
    return this.http.get<Book>(`${this.jsonUrl}`);
  }

  /**
   * Compatibilité : Récupère tous les livres disponibles.
   */
  getAvailableBooks(): Observable<Book[]> {
    return this.getBooks('', false, []);
  }

  /**
   * Recherche de livres par mot-clé (via Mock).
   */
  searchBooks(keyword: string): Observable<Book[]> {
    return this.getBooks(keyword, false, []);
  }
}
