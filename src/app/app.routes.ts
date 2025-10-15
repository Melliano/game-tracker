import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full'
  },
  {
    path: 'games',
    loadComponent: () => import('./features/games/pages/game-list/game-list.component').then(m => m.GameListComponent)
  },
  {
    path: 'games/:id',
    loadComponent: () => import('./features/games/pages/game-detail/game-detail.component').then(m => m.GameDetailComponent)
  },
  {
    path: 'my-library',
    loadComponent: () => import('./features/games/pages/my-library/my-library.component').then(m => m.MyLibraryComponent)
  },
  {
    path: '**',
    redirectTo: 'games'
  }
];
