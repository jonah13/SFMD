import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders }  from './app.routing';

import { AppComponent } from './app.component';
import { MoviesListComponent } from './views/movies/movies-list/movies-list.component';
import {HttpService} from './services/http/http.service';
import {TitleService} from './services/helpers/title.service';
import {MovieApiService} from './models/movies/movie.api.service';
import {MovieModelService} from './models/movies/movie.model.service';
import { MovieDetailsComponent } from './views/movies/movie-details/movie-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MovieDetailsComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    appRoutingProviders,
    HttpService,
    TitleService,
    MovieApiService,
    MovieModelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
