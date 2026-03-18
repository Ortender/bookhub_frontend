
export interface Book {
  isbn: string;
  title: string;
  author: string;
  coverImage: string;
  nbCopies: number;
  rating: number;
  reviews: number;
  isAvailable?: boolean;
}
