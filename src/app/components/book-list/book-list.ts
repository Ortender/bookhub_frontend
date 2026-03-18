import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';
import { BookCard } from '../book-card/book-card';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookCard],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookListComponent {
  @Input({ required: true }) books: Book[] = [];
  @Output() viewDetailEvent = new EventEmitter<any>();
}
