import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css'
})
export class BookDetailComponent implements OnInit {
  book?: Book;

  constructor(
    private route: ActivatedRoute, // Utilisé pour récupérer le :id depuis l'URL
    private bookService: BookService // Utilisé pour effectuer les requêtes au backend
  ) {}

  ngOnInit(): void {
    // 1. Récupération du paramètre 'id' dans l'URL (défini dans app.routes.ts)
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // 2. Appel de la méthode getBookById précédemment intégrée dans le service
      this.bookService.getBookById(id).subscribe({
        next: (data) => {
          this.book = data;
        },
        error: (err) => {
          console.error('Livre introuvable', err);
        }
      });
    }
  }
}
