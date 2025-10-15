import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GameService } from '../../../../core/services/game.service';

@Component({
  selector: 'app-review-form',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.scss'
})
export class ReviewFormComponent {
  private readonly gameService = inject(GameService);
  
  // Inputs
  public readonly gameId = input.required<string>();
  public readonly gameName = input.required<string>();
  
  // Outputs
  public readonly reviewSubmitted = output<void>();
  public readonly cancelled = output<void>();
  
  // Form state
  protected rating = signal<0 | 1 | 2 | 3 | 4 | 5>(1);
  protected hoverRating = signal<0 | 1 | 2 | 3 | 4 | 5>(0);
  protected title = signal('');
  protected content = signal('');
  protected submitting = signal(false);
  
  protected readonly stars = [1, 2, 3, 4, 5] as const;
  
  protected setRating(rating: 1 | 2 | 3 | 4 | 5): void {
    this.rating.set(rating);
  }
  
  protected setHoverRating(rating: 1 | 2 | 3 | 4 | 5): void {
    this.hoverRating.set(rating);
  }
  
  protected clearHoverRating(): void {
    this.hoverRating.set(0);
  }
  
  protected getStarIcon(star: number): string {
    const activeRating = this.hoverRating() || this.rating();
    return star <= activeRating ? 'star' : 'star_border';
  }
  
  protected isFormValid(): boolean {
    return this.rating() > 0 && 
           this.title().trim().length > 0 && 
           this.content().trim().length >= 10;
  }
  
  protected submitReview(): void {
    if (!this.isFormValid() || this.submitting()) {
      return;
    }
    
    this.submitting.set(true);
    
    const rating = this.rating() as 0 | 1 | 2 | 3 | 4 | 5;
    
    this.gameService.addReview({
      gameId: this.gameId(),
      userName: 'You',
      rating: rating,
      title: this.title().trim(),
      content: this.content().trim()
    }).subscribe({
      next: () => {
        this.reviewSubmitted.emit();
        this.resetForm();
      },
      error: () => {
        this.submitting.set(false);
      }
    });
  }
  
  protected cancel(): void {
    this.cancelled.emit();
    this.resetForm();
  }
  
  private resetForm(): void {
    this.rating.set(0);
    this.hoverRating.set(0);
    this.title.set('');
    this.content.set('');
    this.submitting.set(false);
  }
}

