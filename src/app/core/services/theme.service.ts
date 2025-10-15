import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'game-tracker-theme';
  
  // Signal for reactive theme state
  public readonly theme = signal<Theme>(this.getInitialTheme());
  
  constructor() {
    // Effect to apply theme changes
    effect(() => {
      const theme = this.theme();
      this.applyTheme(theme);
      localStorage.setItem(this.THEME_KEY, theme);
    });
  }
  
  private getInitialTheme(): Theme {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  }
  
  private applyTheme(theme: Theme): void {
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
  }
  
  public toggleTheme(): void {
    this.theme.update(current => current === 'light' ? 'dark' : 'light');
  }
}

