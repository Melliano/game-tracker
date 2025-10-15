# Game Tracker - Project Structure

This project follows Angular best practices with a **feature-based architecture**.

## Directory Structure

```
src/app/
├── core/                          # Core functionality (singleton services, models)
│   ├── models/
│   │   └── game.model.ts         # Data models and interfaces
│   └── services/
│       ├── game.service.ts       # Game data management with RxJS
│       └── theme.service.ts      # Theme switching (light/dark mode)
│
├── shared/                        # Shared components used across features
│   └── components/
│       └── header/               # Application header with navigation
│
├── features/                      # Feature modules
│   ├── games/                    # Games feature
│   │   ├── pages/
│   │   │   ├── game-list/       # Browse all games
│   │   │   ├── game-detail/     # View game details
│   │   │   └── my-library/      # User's game library
│   │   └── components/          # Game-specific components (future)
│   │
│   └── reviews/                  # Reviews feature
│       └── components/
│           ├── review-form/     # Write/submit reviews
│           └── review-list/     # Display reviews
│
├── app.config.ts                 # Application configuration
├── app.routes.ts                 # Route definitions
├── app.ts                        # Root component
├── app.html                      # Root template
└── app.scss                      # Root styles
```

## Key Technologies

- **Angular 20** - Latest Angular with standalone components
- **Angular Material** - UI component library
- **RxJS** - Reactive programming with Observables
- **Signals** - Angular's new reactivity primitive
- **TypeScript** - Type-safe development
- **SCSS** - Enhanced CSS with variables and nesting

## Features

### 1. Game Browsing (`/games`)
- View all available games
- Search by title, developer, or genre
- Filter by genre
- Sort by rating, title, or release date
- Click any game to view details

### 2. Game Details (`/games/:id`)
- View comprehensive game information
- See aggregate ratings and reviews
- Add game to your library (Playing, Completed, Wishlist, Dropped)
- Track hours played and last played date
- Write reviews
- Read other users' reviews

### 3. My Library (`/my-library`)
- Organized by status (Playing, Completed, Wishlist, Dropped)
- Track your gaming progress
- Quick access to your games

### 4. Reviews
- Rate games (1-10 scale)
- Write detailed reviews
- View community reviews
- See helpful vote counts

### 5. Theming
- Light and dark mode support
- Smooth transitions between themes
- Persists user preference
- System preference detection

## Architecture Patterns

### Feature-Based Organization
Each feature is self-contained with its own:
- Pages (smart components)
- Components (presentational components)
- Services (if feature-specific)
- Models (if feature-specific)

### Core vs Shared vs Features
- **Core**: Singleton services and app-wide models
- **Shared**: Reusable components/directives/pipes used across features
- **Features**: Self-contained feature modules

### Smart vs Presentational Components
- **Smart Components** (Pages): Handle business logic, service injection, routing
- **Presentational Components**: Display data, emit events, reusable

### Signals + RxJS
- **Signals**: Local component state and derived state
- **RxJS Observables**: Async operations, HTTP calls, complex state management
- Services use both for maximum flexibility

## Styling Strategy

### Theme System
- Material theme defined in `styles.scss`
- Light/dark themes using CSS classes
- Smooth transitions with CSS
- Theme service manages state

### Component Styles
- Each component has its own `.scss` file
- Scoped to component (`:host` context)
- Uses `:host-context(.dark-theme)` for theme-specific styles
- Material Design principles

## Data Flow

```
User Action
    ↓
Component (Signal/Observable)
    ↓
Service (Business Logic)
    ↓
State Update (Signal/BehaviorSubject)
    ↓
UI Update (Automatic via signals/observables)
```

## State Management

Currently using:
- **Service-based state** with Signals and BehaviorSubjects
- No external state management library (NgRx, etc.)
- Simple and effective for current scope

Future: Could add NgRx or Signal Store for more complex state needs

## Mock Data

Mock data is currently provided by `GameService`:
- 6 sample games with reviews
- User library with game statuses
- Sample reviews from multiple users

Ready for backend integration - just replace service methods with HTTP calls.

## Best Practices Implemented

✅ Feature-based architecture  
✅ Standalone components (no NgModules)  
✅ Lazy loading routes  
✅ TypeScript strict mode  
✅ Material Design  
✅ Responsive design  
✅ Accessibility (ARIA labels, semantic HTML)  
✅ Signal-based reactivity  
✅ RxJS for async operations  
✅ Separation of concerns  
✅ DRY principle  
✅ Component isolation  
✅ Type safety  

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Next Steps for Enhancement

1. **Backend Integration**
   - Replace mock data with HTTP calls
   - Add authentication
   - Persist user data

2. **Additional Features**
   - User profiles
   - Friend system
   - Game recommendations
   - Advanced search/filters
   - Social features (share reviews, follow users)
   - Screenshots and media galleries

3. **Performance**
   - Virtual scrolling for large lists
   - Image lazy loading
   - Caching strategies

4. **Testing**
   - Unit tests for services
   - Component tests
   - E2E tests with Playwright

5. **CI/CD**
   - GitHub Actions
   - Automated testing
   - Deployment pipeline

