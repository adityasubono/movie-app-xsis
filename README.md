## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/adityasubono/movie-app-xsis.git
   ```
2. Install packages
   ```sh
   yarn
   ```
3. Install Husky
   ```sh
   yarn husky install
   ```
4. Setup Husky
   ```sh
   chmod ug+x .husky/*
   ```
5. Start the app
   ```sh
   yarn dev
   ```

## Approach

- I started by creating a simple React app using Vite and TypeScript.
- I then added ESLint, Prettier, Husky, lint-staged, Commitlint, Conventional Commits, and Commitizen for code quality.
- I then added Tailwind CSS for styling and React Router for routing.
- I then added Axios and React Query for fetching data from the TMDB API.
- I then added Zustand for state management.
- I then added Vitest and React Testing Library for testing.

### Routing

- I started by creating the routes.
- I created the home page, search page, movie details page, and other page.
- I used React Router v6 createBrowserRouter to create the routes.

### Responsive Design

- I started with mobile first approach.
- In the middle of development I refactored the UI to make it more responsive to desktop and tablet.
- Design ideas were taken from dribbble and spontaneous ideas.

### Serivces

- I then created the services.
- I created a movie service to group all the movie related endpoints into one service file to make it easier to use and distribute.

### State Management

- I then created the store.
- I created a store using Zustand to store the search data and the search query params.
- I persisted the store using local storage so that the search data is persisted and not lost when the page is refreshed.

### Home Page

- I started by creating the home page.
- I created a list of Card components to display the movies.
- I used React Query to fetch the movies from the TMDB API.
- I used React Router to navigate to the movie details page when a movie is clicked.

### Search Page

- I then created the search page.
- I created a search bar and a list of Card components to display the search results.
- I used React Query to fetch the search results from the TMDB API.
- The searched movies are stored in the query params and zustand store so that the search results are persisted and not lost when the page is refreshed. It also works the same with the pagination.
<!-- - I remove all the search data from store when the user navigates away from the search page or when the search page component is unmounted. -->
- I used React Router to navigate to the movie details page when a movie is clicked.


