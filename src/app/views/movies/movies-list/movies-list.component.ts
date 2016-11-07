import { Component, OnInit, OnDestroy } from '@angular/core';
import {TitleService} from '../../../services/helpers/title.service';
import {MovieModelService} from '../../../models/movies/movie.model.service';
import {Movie} from '../../../models/movies/movie.interface';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html'
})
export class MoviesListComponent implements OnInit, OnDestroy {

  movies:Movie[] = [];
  _movieModelServiceSubscription: any;

  constructor(private _movieModelService:MovieModelService,
              private pageTitle:TitleService) {

  }

  ngOnInit() {
    this._movieModelServiceSubscription = this._movieModelService.observer$
      .subscribe(result => this.handleResponse(result));
    this.pageTitle.setTitle('Companies');
    this._movieModelService.list();
  }

  ngOnDestroy() {
    this._movieModelServiceSubscription.unsubscribe();
  }

  handleResponse(result) {
    if (result && result.length) {
      this.movies = result;
    }
  }

}
