import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable, of, delay, map } from 'rxjs';
import { Game, GameStatus, Review } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  // Current user (mocked)
  private readonly currentUserId = 'user-1';
  
  // Signal-based state
  private gamesSignal = signal<Game[]>(this.getMockGames());
  private gameStatusesSignal = signal<GameStatus[]>(this.getMockGameStatuses());
  private reviewsSignal = signal<Review[]>(this.getMockReviews());
  
  // Public computed signals
  public readonly games = computed(() => this.gamesSignal());
  public readonly gameStatuses = computed(() => this.gameStatusesSignal());
  public readonly reviews = computed(() => this.reviewsSignal());
  
  // Observable streams for async operations
  private gamesSubject = new BehaviorSubject<Game[]>(this.getMockGames());
  private reviewsSubject = new BehaviorSubject<Review[]>(this.getMockReviews());
  
  public games$ = this.gamesSubject.asObservable();
  public reviews$ = this.reviewsSubject.asObservable();
  
  constructor() {}
  
  // Get all games
  public getGames(): Observable<Game[]> {
    return of(this.gamesSignal()).pipe(delay(100));
  }
  
  // Get game by ID
  public getGameById(id: string): Observable<Game | undefined> {
    return this.getGames().pipe(
      map(games => games.find(game => game.id === id))
    );
  }
  
  // Get user's game statuses
  public getUserGameStatuses(): Observable<GameStatus[]> {
    return of(this.gameStatusesSignal()).pipe(delay(100));
  }
  
  // Get reviews for a game
  public getReviewsForGame(gameId: string): Observable<Review[]> {
    return this.reviews$.pipe(
      map(reviews => reviews.filter(review => review.gameId === gameId))
    );
  }
  
  // Add or update game status
  public updateGameStatus(status: Omit<GameStatus, 'userId'>): void {
    const newStatus: GameStatus = {
      ...status,
      userId: this.currentUserId
    };
    
    this.gameStatusesSignal.update(statuses => {
      const index = statuses.findIndex(s => s.gameId === status.gameId);
      if (index >= 0) {
        const updated = [...statuses];
        updated[index] = newStatus;
        return updated;
      } else {
        return [...statuses, newStatus];
      }
    });
  }
  
  // Add a review
  public addReview(review: Omit<Review, 'id' | 'userId' | 'createdAt' | 'helpfulCount'>): Observable<Review> {
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}`,
      userId: this.currentUserId,
      createdAt: new Date(),
      helpfulCount: 0
    };
    
    this.reviewsSignal.update(reviews => [...reviews, newReview]);
    this.reviewsSubject.next(this.reviewsSignal());
    
    // Update game's average rating
    this.updateGameRating(newReview.gameId);
    
    return of(newReview).pipe(delay(100));
  }
  
  // Update game rating statistics
  private updateGameRating(gameId: string): void {
    const gameReviews = this.reviewsSignal().filter(r => r.gameId === gameId);
    const avgRating = gameReviews.reduce((sum, r) => sum + r.rating, 0) / gameReviews.length;
    
    this.gamesSignal.update(games => {
      return games.map(game => {
        if (game.id === gameId) {
          return {
            ...game,
            averageRating: Math.round(avgRating * 10) / 10,
            totalReviews: gameReviews.length
          };
        }
        return game;
      });
    });
    
    this.gamesSubject.next(this.gamesSignal());
  }
  
  // Mock data
  private getMockGames(): Game[] {
    return [
      {
        id: '1',
        title: 'The Legend of Zelda: Breath of the Wild',
        developer: 'Nintendo EPD',
        publisher: 'Nintendo',
        releaseDate: new Date('2017-03-03'),
        genre: ['Action', 'Adventure', 'Open World'],
        platform: ['Nintendo Switch', 'Wii U'],
        coverImage: 'https://placehold.co/300x400/4A90E2/ffffff?text=Zelda+BOTW&font=roboto',
        description: 'An open-world action-adventure game where you explore Hyrule and defeat Calamity Ganon.',
        averageRating: 4.5,
        totalReviews: 3
      },
      {
        id: '2',
        title: 'Red Dead Redemption 2',
        developer: 'Rockstar Studios',
        publisher: 'Rockstar Games',
        releaseDate: new Date('2018-10-26'),
        genre: ['Action', 'Adventure', 'Western'],
        platform: ['PlayStation 4', 'Xbox One', 'PC'],
        coverImage: 'https://placehold.co/300x400/E57373/ffffff?text=RDR2&font=roboto',
        description: 'An epic tale of life in America at the dawn of the modern age.',
        averageRating: 4.2,
        totalReviews: 2
      },
      {
        id: '3',
        title: 'Elden Ring',
        developer: 'FromSoftware',
        publisher: 'Bandai Namco',
        releaseDate: new Date('2022-02-25'),
        genre: ['Action RPG', 'Dark Fantasy', 'Open World'],
        platform: ['PlayStation 5', 'PlayStation 4', 'Xbox Series X/S', 'Xbox One', 'PC'],
        coverImage: 'https://placehold.co/300x400/FFB74D/ffffff?text=Elden+Ring&font=roboto',
        description: 'A dark fantasy action RPG set in the Lands Between.',
        averageRating: 3.5,
        totalReviews: 2
      },
      {
        id: '4',
        title: 'Hades',
        developer: 'Supergiant Games',
        publisher: 'Supergiant Games',
        releaseDate: new Date('2020-09-17'),
        genre: ['Roguelike', 'Action', 'Indie'],
        platform: ['PC', 'Nintendo Switch', 'PlayStation 5', 'Xbox Series X/S'],
        coverImage: 'https://placehold.co/300x400/9575CD/ffffff?text=Hades&font=roboto',
        description: 'A rogue-like dungeon crawler where you defy the god of the dead.',
        averageRating: 4.0,
        totalReviews: 1
      },
      {
        id: '5',
        title: 'Hollow Knight',
        developer: 'Team Cherry',
        publisher: 'Team Cherry',
        releaseDate: new Date('2017-02-24'),
        genre: ['Metroidvania', 'Action', 'Platformer'],
        platform: ['PC', 'Nintendo Switch', 'PlayStation 4', 'Xbox One'],
        coverImage: 'https://placehold.co/300x400/81C784/ffffff?text=Hollow+Knight&font=roboto',
        description: 'Explore a vast interconnected underground kingdom filled with secrets.',
        averageRating: 4.0,
        totalReviews: 1
      },
      {
        id: '6',
        title: 'Baldur\'s Gate 3',
        developer: 'Larian Studios',
        publisher: 'Larian Studios',
        releaseDate: new Date('2023-08-03'),
        genre: ['RPG', 'Strategy', 'Adventure'],
        platform: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
        coverImage: 'https://placehold.co/300x400/64B5F6/ffffff?text=BG3&font=roboto',
        description: 'Gather your party and return to the Forgotten Realms in this epic D&D adventure.',
        averageRating: 0,
        totalReviews: 0
      }
    ];
  }
  
  private getMockGameStatuses(): GameStatus[] {
    return [
      {
        gameId: '1',
        userId: 'user-1',
        status: 'completed',
        hoursPlayed: 120,
        lastPlayed: new Date('2024-03-15'),
        addedDate: new Date('2023-12-01')
      },
      {
        gameId: '2',
        userId: 'user-1',
        status: 'playing',
        hoursPlayed: 45,
        lastPlayed: new Date(),
        addedDate: new Date('2024-01-10')
      },
      {
        gameId: '3',
        userId: 'user-1',
        status: 'completed',
        hoursPlayed: 85,
        lastPlayed: new Date('2024-02-20'),
        addedDate: new Date('2024-01-05')
      },
      {
        gameId: '6',
        userId: 'user-1',
        status: 'wishlist',
        addedDate: new Date('2024-10-01')
      }
    ];
  }
  
  private getMockReviews(): Review[] {
    return [
      {
        id: 'r1',
        gameId: '1',
        userId: 'user-1',
        userName: 'You',
        rating: 4,
        title: 'A Masterpiece of Open World Design',
        content: 'Breath of the Wild revolutionized the open-world genre. The freedom it gives players is unmatched, and every corner of Hyrule is worth exploring. The physics system, climbing mechanics, and emergent gameplay make every playthrough unique.',
        createdAt: new Date('2024-03-16'),
        helpfulCount: 24
      },
      {
        id: 'r2',
        gameId: '1',
        userId: 'user-2',
        userName: 'GamerPro23',
        userAvatar: 'https://via.placeholder.com/50/FF6B6B/ffffff?text=GP',
        rating: 3,
        title: 'Incredible Adventure',
        content: 'One of the best games I\'ve ever played. The exploration is amazing and the world feels truly alive.',
        createdAt: new Date('2024-02-10'),
        helpfulCount: 18
      },
      {
        id: 'r3',
        gameId: '1',
        userId: 'user-3',
        userName: 'ZeldaFan99',
        userAvatar: 'https://via.placeholder.com/50/4ECDC4/ffffff?text=ZF',
        rating: 4,
        title: 'Perfect Game',
        content: 'This game set a new standard for open-world games. Everything about it is polished and fun.',
        createdAt: new Date('2024-01-15'),
        helpfulCount: 31
      },
      {
        id: 'r4',
        gameId: '2',
        userId: 'user-4',
        userName: 'WesternFan',
        userAvatar: 'https://via.placeholder.com/50/95E1D3/ffffff?text=WF',
        rating: 2,
        title: 'A Story-Driven Masterpiece',
        content: 'The narrative and character development in RDR2 is unparalleled. The attention to detail in the world is stunning.',
        createdAt: new Date('2024-03-01'),
        helpfulCount: 15
      },
      {
        id: 'r5',
        gameId: '2',
        userId: 'user-5',
        userName: 'RockstarFan',
        userAvatar: 'https://via.placeholder.com/50/F38181/ffffff?text=RF',
        rating: 3,
        title: 'Best Game Ever Made',
        content: 'This game is a technical marvel. The story made me cry. Arthur Morgan is one of the best protagonists in gaming.',
        createdAt: new Date('2024-02-20'),
        helpfulCount: 42
      },
      {
        id: 'r6',
        gameId: '3',
        userId: 'user-6',
        userName: 'SoulsVeteran',
        userAvatar: 'https://via.placeholder.com/50/AA96DA/ffffff?text=SV',
        rating: 4,
        title: 'FromSoft at Their Best',
        content: 'Elden Ring takes everything great about Dark Souls and expands it into an open world. The boss fights are epic.',
        createdAt: new Date('2024-03-10'),
        helpfulCount: 27
      },
      {
        id: 'r7',
        gameId: '3',
        userId: 'user-7',
        userName: 'TarnishedOne',
        userAvatar: 'https://via.placeholder.com/50/FCBAD3/ffffff?text=TO',
        rating: 3,
        title: 'Challenging but Rewarding',
        content: 'Every victory feels earned. The world is beautiful and terrifying. Definitely recommend for Souls fans.',
        createdAt: new Date('2024-02-25'),
        helpfulCount: 19
      },
      {
        id: 'r8',
        gameId: '4',
        userId: 'user-8',
        userName: 'IndieGamer',
        userAvatar: 'https://via.placeholder.com/50/A8D8EA/ffffff?text=IG',
        rating: 4,
        title: 'Addictive Gameplay Loop',
        content: 'Just one more run... The story and gameplay mesh perfectly. Best roguelike I\'ve played.',
        createdAt: new Date('2024-01-20'),
        helpfulCount: 12
      },
      {
        id: 'r9',
        gameId: '5',
        userId: 'user-9',
        userName: 'MetroidvaniaLover',
        userAvatar: 'https://via.placeholder.com/50/AACC00/ffffff?text=ML',
        rating: 4,
        title: 'Atmospheric Perfection',
        content: 'The art style, music, and world design create an unforgettable experience. Every area feels unique.',
        createdAt: new Date('2024-01-05'),
        helpfulCount: 22
      }
    ];
  }
}

