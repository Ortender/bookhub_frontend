export interface Book {
  isbn: string;
  title: string;
  author: string;
  coverImage: string;
  nbCopies: number;
  nbEmpruntsEnCours: number;
  rating: number;
  reviews: number;
  description?: string;
  categories?: string[];
}
