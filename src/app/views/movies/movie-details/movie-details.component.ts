import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TitleService} from '../../../services/helpers/title.service';
import {MovieModelService} from '../../../models/movies/movie.model.service';
import {Movie} from '../../../models/movies/movie.interface';
import {GeocodingModelService} from '../../../services/geocoding/geocoding.model.service';

@Component({
  selector: 'app-movie-details',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './movie-details.component.html',
  styleUrls: ['../../../../assets/styles/pages/movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  title: string = '';
  array_keys: string[] = ['release_year', 'locations', 'fun_facts', 'production_company', 'distributor',
    'director', 'writer', 'actor_1', 'actor_2', 'actor_3'];
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
  movieDetails: any = null;
  movieDetailsKeys: string[] = [];
  _movieModelServiceSubscription: any;

  constructor(private _movieModelService:MovieModelService,
              private _geocodingModelService:GeocodingModelService,
              private _route:ActivatedRoute,
              private pageTitle:TitleService) {
    this.pageTitle.setTitle('Movie Details');
  }

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
  }

  ngOnDestroy() {
    this._movieModelServiceSubscription.unsubscribe();
  }

  handleMovieModelResponse(result) {
    if (result.Response === 'True') {
      this.movieDetails = result;
      this.movieDetailsKeys = Object.keys(result);
    } else if (result && result.length > 0) {
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
      this.getLocationsGeocoding();
      this.getExtraMovieDetails();
      //console.log(this.movie);
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

  getExtraMovieDetails() {
    this._movieModelService.viewDetails({t:this.movie.title, y:this.movie.release_year[0]});
  }
  getLocationsGeocoding() {
    for (let i = 0; i < this.movie.locations.length; i++) {
      this._geocodingModelService.list(encodeURIComponent(this.movie.locations[i]+', San Francisco, CA, USA'));
    }
  }

  handleGeocodingResponse(result) {
    if (result && result.results[0] && result.results[0].geometry && result.results[0].geometry.location) {
      let coors = result.results[0].geometry.location;
      if (this.movie.coordinates.map(c => ''+c.lat+c.lng).indexOf(''+coors.lat+coors.lng) === -1) {
        this.movie.coordinates.push(coors);
      }
    }
  }
}
