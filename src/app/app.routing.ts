import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MovieDetailsComponent} from './views/movies/movie-details/movie-details.component';
import {MoviesListComponent} from './views/movies/movies-list/movies-list.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MoviesListComponent
  },
  {
    path: 'movies',
    component: MoviesListComponent,
    data: {
      title: 'Companies List'
    }
  },
  {
    path: 'movieDetails/:title',
    component: MovieDetailsComponent,
    data: {
      title: 'Movie Details'
    }
  }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
