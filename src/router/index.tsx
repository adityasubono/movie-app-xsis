import HomePage from '@/pages/HomePage';
import SearchPage from '@/pages/SearchPage';
import MainLayout from '@/templates/MainLayout';
import { createBrowserRouter } from 'react-router-dom';
import MoviesPage from "@/pages/MoviesPage.tsx";
import GenrePage from "@/pages/GenrePage.tsx";
import SeriesPage from "@/pages/SeriesPage.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/series',
        element: <SeriesPage />,
      },
      {
        path: '/movies',
        element: <MoviesPage />,
      },
      {
        path: '/genre',
        element: <GenrePage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
    ],
  },
]);
