import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {CONFIG} from './shared/config';
import {routing, appRoutingProviders}  from './app.routing';

import {AppComponent} from './app.component';
import {MoviesListComponent} from './views/movies/movies-list/movies-list.component';
import {HttpService} from './services/http/http.service';
import {TitleService} from './services/helpers/title.service';
import {MovieApiService} from './models/movies/movie.api.service';
import {MovieModelService} from './models/movies/movie.model.service';
import {MovieDetailsComponent} from './views/movies/movie-details/movie-details.component';
import {GeocodingModelService} from './services/geocoding/geocoding.model.service';
import {GeocodingApiService} from './services/geocoding/geocoding.api.service';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {MapComponent} from './components/map/map.component';
import {HomeComponent} from './views/home/home.component';
import {TimelineComponent} from './components/timeline/timeline.component';
import {MenuComponent} from './components/menus/menu.component';
import {LocalStorageService} from './services/local-storage/local-storage.service';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { PhotoDisplayComponent } from './components/photo-display/photo-display.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TimelineComponent,
    MenuComponent,
    MoviesListComponent,
    MovieDetailsComponent,
    MapComponent,
    MovieItemComponent,
    PhotoDisplayComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: CONFIG.MAP_API_TOKEN
    })
  ],
  providers: [
    appRoutingProviders,
    HttpService,
    TitleService,
    MovieApiService,
    MovieModelService,
    GeocodingApiService,
    GeocodingModelService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
