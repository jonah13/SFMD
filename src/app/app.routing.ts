import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MovieDetailsComponent} from './views/movies/movie-details/movie-details.component';
import {MoviesListComponent} from './views/movies/movies-list/movies-list.component';
import {HomeComponent} from './views/home/home.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
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
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
