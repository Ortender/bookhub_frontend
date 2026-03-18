import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // Chemin vers le fichier Mock (situé dans le dossier /public)
  private readonly jsonUrl = 'books.json';

  // URL réelle de l'API (commentée pour l'instant)
  // private readonly apiUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste des livres en filtrant ceux dont le stock (nbCopies) est à 0.
   * (Conformément à la conception : un livre avec 0 copie ne doit pas apparaître).
   */
  getBooks(query: string = '', available: boolean = false, categories: string[] = []): Observable<Book[]> {
    return this.http.get<Book[]>(this.jsonUrl).pipe(
      map(books => books.filter(book => book.nbCopies > 0))
    );
  }

  /**
   * Récupère les détails d'un livre spécifique via l'ISBN.
   * En mode Mock, on récupère la liste complète puis on cherche l'élément.
   */
  getBookById(id: string | number): Observable<Book | undefined> {
    return this.http.get<Book[]>(this.jsonUrl).pipe(
      map(books => books.find(book => book.isbn === id))
    );
  }

  /**
   * Méthode de compatibilité : récupère tous les livres disponibles.
   */
  getAvailableBooks(): Observable<Book[]> {
    return this.getBooks();
  }

  /**
   * Recherche des livres par mot-clé (titre ou auteur).
   */
  searchBooks(keyword: string): Observable<Book[]> {
    return this.getBooks().pipe(
      map(books => books.filter(book =>
        book.title.toLowerCase().includes(keyword.toLowerCase()) ||
        book.author.toLowerCase().includes(keyword.toLowerCase())
      ))
    );
  }
}
