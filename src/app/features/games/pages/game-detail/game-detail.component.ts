import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { GameService } from '../../../../core/services/game.service';
import { Game, Review, GameStatus } from '../../../../core/models/game.model';
import { ReviewFormComponent } from '../../../reviews/components/review-form/review-form.component';
import { ReviewListComponent } from '../../../reviews/components/review-list/review-list.component';

@Component({
  selector: 'app-game-detail',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatTabsModule,
    MatMenuModule,
    ReviewFormComponent,
    ReviewListComponent
  ],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.scss'
})
export class GameDetailComponent implements OnInit {
  private readonly gameService = inject(GameService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  
  protected game = signal<Game | null>(null);
  protected reviews = signal<Review[]>([]);
  protected gameStatus = signal<GameStatus | null>(null);
  protected showReviewForm = signal(false);
  
  protected gameId = computed(() => this.route.snapshot.paramMap.get('id') || '');
  
  ngOnInit(): void {
    const id = this.gameId();
    
    // Load game
    this.gameService.getGameById(id).subscribe(game => {
      if (game) {
        this.game.set(game);
      } else {
        this.router.navigate(['/games']);
      }
    });
    
    // Load reviews
    this.gameService.getReviewsForGame(id).subscribe(reviews => {
      this.reviews.set(reviews);
    });
    
    // Load game status
    this.gameService.getUserGameStatuses().subscribe(statuses => {
      const status = statuses.find(s => s.gameId === id);
      this.gameStatus.set(status || null);
    });
  }
  
  protected getRatingStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return [
      ...Array(fullStars).fill('star'),
      ...(hasHalfStar ? ['star_half'] : []),
      ...Array(emptyStars).fill('star_border')
    ];
  }
  
  protected updateGameStatus(status: 'playing' | 'completed' | 'wishlist' | 'dropped'): void {
    const game = this.game();
    if (!game) return;
    
    this.gameService.updateGameStatus({
      gameId: game.id,
      status,
      addedDate: this.gameStatus()?.addedDate || new Date(),
      hoursPlayed: this.gameStatus()?.hoursPlayed,
      lastPlayed: status === 'playing' ? new Date() : this.gameStatus()?.lastPlayed
    });
    
    // Update local state
    this.gameService.getUserGameStatuses().subscribe(statuses => {
      const updatedStatus = statuses.find(s => s.gameId === game.id);
      this.gameStatus.set(updatedStatus || null);
    });
  }
  
  protected toggleReviewForm(): void {
    this.showReviewForm.update(show => !show);
  }
  
  protected onReviewSubmitted(): void {
    this.showReviewForm.set(false);
    // Reload reviews
    const id = this.gameId();
    this.gameService.getReviewsForGame(id).subscribe(reviews => {
      this.reviews.set(reviews);
    });
    
    // Reload game to get updated rating
    this.gameService.getGameById(id).subscribe(game => {
      if (game) {
        this.game.set(game);
      }
    });
  }
  
  protected goBack(): void {
    this.router.navigate(['/games']);
  }
  
  protected getStatusIcon(status: string): string {
    const icons: Record<string, string> = {
      playing: 'play_circle',
      completed: 'check_circle',
      wishlist: 'favorite',
      dropped: 'cancel'
    };
    return icons[status] || 'add';
  }
  
  protected getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      playing: 'Playing',
      completed: 'Completed',
      wishlist: 'Wishlist',
      dropped: 'Dropped'
    };
    return labels[status] || 'Add to Library';
  }
}

