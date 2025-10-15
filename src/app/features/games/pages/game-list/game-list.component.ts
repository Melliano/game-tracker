import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GameService } from '../../../../core/services/game.service';
import { Game } from '../../../../core/models/game.model';

@Component({
  selector: 'app-game-list',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})
export class GameListComponent implements OnInit {
  private readonly gameService = inject(GameService);
  private readonly router = inject(Router);
  
  protected searchTerm = signal('');
  protected selectedGenre = signal<string>('all');
  protected sortBy = signal<'title' | 'rating' | 'releaseDate'>('rating');
  
  protected games = computed(() => {
    let games = this.gameService.games();
    
    // Filter by search term
    const search = this.searchTerm().toLowerCase();
    if (search) {
      games = games.filter(game =>
        game.title.toLowerCase().includes(search) ||
        game.developer.toLowerCase().includes(search) ||
        game.genre.some(g => g.toLowerCase().includes(search))
      );
    }
    
    // Filter by genre
    const genre = this.selectedGenre();
    if (genre !== 'all') {
      games = games.filter(game => game.genre.includes(genre));
    }
    
    // Sort
    const sortBy = this.sortBy();
    games = [...games].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.averageRating - a.averageRating;
        case 'releaseDate':
          return b.releaseDate.getTime() - a.releaseDate.getTime();
        default:
          return 0;
      }
    });
    
    return games;
  });
  
  protected allGenres = computed(() => {
    const genres = new Set<string>();
    this.gameService.games().forEach(game => {
      game.genre.forEach(g => genres.add(g));
    });
    return Array.from(genres).sort();
  });
  
  ngOnInit(): void {
    // Load games
    this.gameService.getGames().subscribe();
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

