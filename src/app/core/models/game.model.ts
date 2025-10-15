export interface Game {
  id: string;
  title: string;
  developer: string;
  publisher: string;
  releaseDate: Date;
  genre: string[];
  platform: string[];
  coverImage: string;
  description: string;
  averageRating: number; 
  totalReviews: number;
}

export interface GameStatus {
  gameId: string;
  userId: string;
  status: 'playing' | 'completed' | 'wishlist' | 'dropped';
  hoursPlayed?: number;
  lastPlayed?: Date;
  addedDate: Date;
}

export interface Review {
  id: string;
  gameId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: 0 | 1 | 2 | 3 | 4 | 5; // 5-star rating system
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  helpfulCount: number;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  joinDate: Date;
}

