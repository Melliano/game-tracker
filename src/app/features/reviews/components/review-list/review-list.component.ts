import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Review } from '../../../../core/models/game.model';

@Component({
  selector: 'app-review-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss'
})
export class ReviewListComponent {
  public readonly reviews = input.required<Review[]>();
  
  protected sortedReviews = computed(() => {
    return [...this.reviews()].sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  });
  
  protected getRatingStars(rating: number): string[] {
    const fullStars = rating;
    const emptyStars = 5 - rating;
    
    return [
      ...Array(fullStars).fill('star'),
      ...Array(emptyStars).fill('star_border')
    ];
  }
  
  protected getTimeSince(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(diffInDays / 365);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  }
}

