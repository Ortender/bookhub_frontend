import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';
import { StarRatingComponent} from '../star-rating/star-rating';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [StarRatingComponent, CommonModule],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css'
})
export class BookCard {
  @Input({ required: true }) book!: Book;
}
