import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TitleService} from '../../../services/helpers/title.service';
import {MovieModelService} from '../../../models/movies/movie.model.service';
import {Movie} from '../../../models/movies/movie.interface';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.sass']
})
export class MovieDetailsComponent implements OnInit {
  title: string = '';
  array_keys: string[] = ['release_year', 'locations', 'fun_facts', 'production_company', 'distributor',
    'director', 'writer', 'actor_1', 'actor_2', 'actor_3'];
  movie: Movie = <Movie>{
    title: '',
    release_year: [],
    locations: [],
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

  constructor(private _movieModelService:MovieModelService,
              private _route:ActivatedRoute,
              private pageTitle:TitleService) {
    this.pageTitle.setTitle('Movie Details');
  }

  ngOnInit() {
    this.title = this._route.snapshot.params['title'];
    if (this.title) {
      this._movieModelService.view(this.title);
    }
    this._movieModelService.observer$.subscribe(result => this.handleResponse(result));
  }

  handleResponse(result) {
    if (result && result.length > 0 && result[0].title) {
      this.movie.title = result[0].title;
      this.pageTitle.setTitle('Details for the movie: ' + this.movie.title);
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
      console.log(this.movie);
    }
  }
}
