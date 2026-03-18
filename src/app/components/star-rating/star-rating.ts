import { Component, Input } from '@angular/core';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.css'
})
export class StarRatingComponent {
  @Input() rating: number = 0; // commentaire:rating est un nombre entre 0 et 5
  @Input() count: number = 0;

  faSolidStar = solidStar;
  faRegularStar = regularStar;
  faStarHalf = faStarHalfAlt;

  //commentaire:stars est un tableau de nombres allant de 1 à 5
  get stars() {
    return Array(5).fill(0).map((_, i) => i + 1);
  }
}
