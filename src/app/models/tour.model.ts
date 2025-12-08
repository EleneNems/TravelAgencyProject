export interface Tour {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: number;
  oldPrice?: number | null;
  sale?: boolean;
  image?: string;
  description?: string;
  typology?: string;
  color?: string;
}
