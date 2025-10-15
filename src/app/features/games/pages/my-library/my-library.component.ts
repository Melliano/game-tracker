import { Component, inject, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { GameService } from '../../../../core/services/game.service';
import { Game, GameStatus } from '../../../../core/models/game.model';

@Component({
  selector: 'app-my-library',
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './my-library.component.html',
  styleUrl: './my-library.component.scss'
})
export class MyLibraryComponent implements OnInit {
  private readonly gameService = inject(GameService);
  private readonly router = inject(Router);
  
  protected allGames = computed(() => this.gameService.games());
  protected gameStatuses = computed(() => this.gameService.gameStatuses());
  
  protected playingGames = computed(() => this.getGamesByStatus('playing'));
  protected completedGames = computed(() => this.getGamesByStatus('completed'));
  protected wishlistGames = computed(() => this.getGamesByStatus('wishlist'));
  protected droppedGames = computed(() => this.getGamesByStatus('dropped'));
  
  ngOnInit(): void {
    // Load data
    this.gameService.getGames().subscribe();
    this.gameService.getUserGameStatuses().subscribe();
  }
  
  private getGamesByStatus(status: 'playing' | 'completed' | 'wishlist' | 'dropped'): Array<Game & { status: GameStatus }> {
    const statuses = this.gameStatuses().filter(s => s.status === status);
    return statuses.map(status => {
      const game = this.allGames().find(g => g.id === status.gameId);
      return game ? { ...game, status } : null;
    }).filter(g => g !== null) as Array<Game & { status: GameStatus }>;
  }
  
  protected viewGame(gameId: string): void {
    this.router.navigate(['/games', gameId]);
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
}

