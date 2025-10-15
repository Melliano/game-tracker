# Getting Started with Game Tracker

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Disable Angular analytics** (to prevent prompts)
   ```bash
   # If prompted, choose 'N' for no
   ng analytics disable
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

## What You'll See

### Home Page (`/games`)
- A grid of video games with:
  - Cover images
  - Star ratings
  - Developer info
  - Genre chips
- **Search bar** to find games by title, developer, or genre
- **Filter dropdown** to filter by specific genres
- **Sort dropdown** to sort by rating, title, or release date

### Game Detail Page (`/games/:id`)
Click any game card to see:
- Full game information
- Rating breakdown with star visualization
- Developer, publisher, release date
- **Add to Library** button with dropdown:
  - Playing
  - Completed
  - Wishlist
  - Dropped
- **Write a Review** button
- Two tabs:
  - **About**: Game description and your progress (if tracked)
  - **Reviews**: Community reviews and review form

### My Library (`/my-library`)
- Organized tabs for different game statuses:
  - **Playing**: Games you're currently playing (with hours played)
  - **Completed**: Games you've finished
  - **Wishlist**: Games you want to play
  - **Dropped**: Games you stopped playing

### Theme Switcher
- Click the **sun/moon icon** in the header to toggle between light and dark modes
- Your preference is saved to localStorage
- Smooth transitions between themes

## Project Structure

```
src/app/
├── core/              # Core services and models
│   ├── models/        # Data interfaces (Game, Review, etc.)
│   └── services/      # Business logic services
│
├── features/          # Feature modules
│   ├── games/         # Game browsing and library
│   └── reviews/       # Review components
│
└── shared/            # Shared components
    └── components/    # Reusable UI components
```

## Key Files to Explore

- **`app.routes.ts`** - Route definitions
- **`app.config.ts`** - App configuration with Material and animations
- **`core/services/game.service.ts`** - Mock data and game management
- **`core/services/theme.service.ts`** - Theme switching logic
- **`features/games/pages/`** - Main page components
- **`styles.scss`** - Global styles and Material theme

## Mock Data

The app currently uses mock data defined in `GameService`:
- 6 sample games (Zelda, RDR2, Elden Ring, Hades, Hollow Knight, Baldur's Gate 3)
- Sample user library with tracked games
- Sample reviews from multiple users

## Making Changes

### Add a New Game
Edit `core/services/game.service.ts` → `getMockGames()` method

### Change Theme Colors
Edit `src/styles.scss` → Update the Material palette definitions

### Add a New Route
Edit `app.routes.ts` and create a new page component

## Next Steps

1. **Explore the code** - Check out the feature-based structure
2. **Try the features** - Browse games, add to library, write reviews
3. **Toggle themes** - See the light/dark mode in action
4. **Read the docs** - See `PROJECT_STRUCTURE.md` for architecture details

## Troubleshooting

### Port Already in Use
If port 4200 is busy, use:
```bash
ng serve --port 4300
```

### Linter Warnings
The application has some minor Material button projection warnings - these are cosmetic and don't affect functionality.

### Clear Cache
If you see old files or components:
```bash
# Delete node_modules and reinstall
Remove-Item -Path node_modules -Recurse -Force
npm install
```

## Development Tips

- **Hot reload is enabled** - Changes auto-refresh the browser
- **Signals are reactive** - State updates automatically trigger UI updates
- **Lazy loading** - Routes load components on-demand for better performance
- **Standalone components** - No NgModules needed!

## Have Fun! 🎮

Start tracking your gaming journey and exploring the code. The architecture is clean, modular, and ready for extension!

