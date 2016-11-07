import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TitleService} from '../../../services/helpers/title.service';
import {MovieModelService} from '../../../models/movies/movie.model.service';
import {Movie} from '../../../models/movies/movie.interface';
import {GeocodingModelService} from '../../../services/geocoding/geocoding.model.service';
import {CONFIG} from '../../../shared/config';

@Component({
  selector: 'app-movie-details',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './movie-details.component.html',
  styleUrls: ['../../../../assets/styles/pages/movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  /**
   * holds the movie title parameter
   */
  title: string = '';
  /**
   * movie object keys that are arrays
   */
  array_keys: string[] = ['release_year', 'locations', 'fun_facts', 'production_company', 'distributor',
    'director', 'writer', 'actor_1', 'actor_2', 'actor_3'];
  /**
   * object to hold movie returned from api
   */
  movie: Movie = <Movie>{
    title: '',
    release_year: [],
    locations: [],
    coordinates: [],
    fun_facts: [],
    production_company: [],
    distributor: [],
    director: [],
    writer: [],
    actors: [],
    actor_1: '',
    actor_2: '',
    actor_3: ''
  };
  /**
   * object to hold additional movie details from secondary api
   */
  movieDetails: any = null;
  /**
   * service subscription that will allow up to unsubscribe when needed
   */
  _movieModelServiceSubscription: any;
  /**
   * assets relative path
   */
  path: string = CONFIG.ASSETS_PATH;

  /**
   * injecting needed services and setting up page title
   * @param _movieModelService
   * @param _geocodingModelService
   * @param _route
   * @param pageTitle
   */
  constructor(private _movieModelService:MovieModelService,
              private _geocodingModelService:GeocodingModelService,
              private _route:ActivatedRoute,
              private pageTitle:TitleService) {
    this.pageTitle.setTitle('Movie Details');
  }

  /**
   * getting title param, calling APIs on page load 
   */
  ngOnInit() {
    this.title = this._route.snapshot.params['title'];
    if (this.title) {
      this._movieModelService.view(this.title);
      this.movie.title = this.title;
      this.pageTitle.setTitle('Movie Details: ' + this.movie.title);
    }
    this._movieModelServiceSubscription =
      this._movieModelService.observer$.subscribe(result => this.handleMovieModelResponse(result));
    this._geocodingModelService.observer$.subscribe(result => this.handleGeocodingResponse(result));
    this._movieModelService.viewDetails({t: this.movie.title});
  }

  /**
   * actions to be performed when we leave the page 
   */
  ngOnDestroy() {
    this._movieModelServiceSubscription.unsubscribe();
  }

  /**
   * handling API response
   * @param result
   */
  handleMovieModelResponse(result): void {
    if (result.Response === 'True') {
      //secondary API response
      this.movieDetails = result;
    } else if (result && result.length > 0) {
      //primary API response, we format movie object as needed
      for(let i = 0; i < result.length; i++) {
        this.array_keys.forEach(key => {
          let target_key = key;
          if (key.indexOf('actor_') === 0) {
            target_key = 'actors';
          }
          if (result[i][key] && this.movie[target_key].indexOf(result[i][key]) === -1) {
            this.movie[target_key].push(result[i][key]);
          }
        });
      }
      //calling additional APIs
      this.getLocationsGeocoding();
    }
  }

  /**
   * returns movies detail by priority, if it's array returns elements as string
   * @param index1
   * @param index2
   * @returns {any}
   */
  getDetail(index1: string, index2:string): string | boolean {
    if (this.movieDetails && this.movieDetails[index1]) {
      return this.movieDetails[index1];
    }
    if (this.movie[index2]) {
      if (Array.isArray(this.movie[index2])) {
        if (this.movie[index2].length < 1) {
          return false
        }
        let text = '';
        for (let i = 0; i < this.movie[index2].length; i++) {
          if (i > 0) {
            text += ', ';
          }
          text += this.movie[index2][i];
        }
        return text;
      }
      return this.movie[index2];
    }
    return false;
  }

  /**
   * getting locations coordinates on the map from Google Maps API
   */
  getLocationsGeocoding() {
    for (let i = 0; i < this.movie.locations.length; i++) {
      this._geocodingModelService.list(encodeURIComponent(this.movie.locations[i]+', San Francisco, CA, USA'));
    }
  }

  /**
   * handling Google Maps API Response
   * @param result
   */
  handleGeocodingResponse(result) {
    if (result && result.results[0] && result.results[0].geometry && result.results[0].geometry.location) {
      let coors = result.results[0].geometry.location;
      if (this.movie.coordinates.map(c => ''+c.lat+c.lng).indexOf(''+coors.lat+coors.lng) === -1) {
        this.movie.coordinates.push(coors);
      }
    }
  }
}
