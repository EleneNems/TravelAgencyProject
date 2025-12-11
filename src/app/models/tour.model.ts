export interface Tour {
  id: number;
  title: string;
  location: string;
  duration: number;
  price: number;
  oldPrice?: number | null;
  sale?: boolean;
  category: string;
  categoryColor: string;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery?: string[];
  shortDescription: string;
  description?: string;
  featured?: boolean;
  difficulty?: string;
}
