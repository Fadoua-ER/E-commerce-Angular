export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  imageUrl: string;
  stock: number;
  rating: number;
  reviewsCount: number;
}
