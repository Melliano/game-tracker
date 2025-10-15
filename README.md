# Game Tracker

A modern video game tracking application built with Angular 20, Angular Material, and RxJS. Track the games you play, write reviews, and discover what others think about your favorite titles.

## Features

✨ **Browse Games** - Explore a curated collection of video games  
🔍 **Search & Filter** - Find games by title, developer, or genre  
📚 **My Library** - Organize games by status (Playing, Completed, Wishlist, Dropped)  
⭐ **Reviews** - Rate and review games, read community feedback  
🌓 **Dark Mode** - Beautiful light and dark themes with smooth transitions  
📱 **Responsive** - Works great on desktop, tablet, and mobile

## Tech Stack

- **Angular 20** - Latest Angular with standalone components and signals
- **Angular Material** - Material Design UI components
- **RxJS 7** - Reactive programming for async operations
- **TypeScript** - Type-safe development
- **SCSS** - Enhanced styling with variables and nesting

## Project Architecture

This project follows Angular best practices with a **feature-based architecture**:

```
src/app/
├── core/          # Core services and models
├── shared/        # Shared components (header, etc.)
└── features/      # Feature modules
    ├── games/     # Game browsing and library
    └── reviews/   # Review components
```

For detailed architecture information, see [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md).

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd game-tracker

# Install dependencies
npm install

# Start development server
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you modify source files.

## Development

### Development Server

```bash
npm start
# or
ng serve
```

### Build

```bash
npm run build
# or
ng build
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

```bash
npm test
# or
ng test
```

## Key Features Explained

### Game Library Management
Track your gaming journey by organizing games into categories:
- **Playing** - Games you're currently enjoying
- **Completed** - Games you've finished
- **Wishlist** - Games you want to play
- **Dropped** - Games you've stopped playing

### Review System
Share your thoughts with a comprehensive review system:
- Rate games from 1-10
- Write detailed reviews with title and content
- View community reviews sorted by date
- See helpful vote counts

### Theme System
Seamless theme switching with user preference persistence:
- Light mode for daytime use
- Dark mode for comfortable night viewing
- Automatic system preference detection
- Smooth CSS transitions

## Angular Best Practices

This project demonstrates:

✅ Feature-based architecture  
✅ Standalone components (no NgModules)  
✅ Lazy-loaded routes  
✅ Signal-based reactivity  
✅ RxJS for async operations  
✅ TypeScript strict mode  
✅ Component isolation  
✅ Material Design patterns  
✅ Responsive design  
✅ Accessibility considerations  

## Current State

The application currently uses **mock data** for demonstration purposes. All data is stored in-memory via the `GameService`. This makes it easy to:
- Test the UI and features
- Demonstrate functionality
- Plan backend integration

## Future Enhancements

- [ ] Backend API integration
- [ ] User authentication
- [ ] Database persistence
- [ ] Image uploads for games
- [ ] User profiles
- [ ] Friend system
- [ ] Game recommendations
- [ ] Advanced search
- [ ] Social features

## Contributing

This is a demonstration project, but feel free to fork it and add your own enhancements!

## License

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 20.3.5.

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular Material](https://material.angular.io)
- [RxJS Documentation](https://rxjs.dev)
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Detailed architecture docs
