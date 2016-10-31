import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MoviesListComponent } from './views/movies/movies-list/movies-list.component';
import {HttpService} from './services/http/http.service';
import {TitleService} from './services/helpers/title.service';
import {MovieApiService} from './models/movies/movie.api.service';
import {MovieModelService} from './models/movies/movie.model.service';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    HttpService,
    TitleService,
    MovieApiService,
    MovieModelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
