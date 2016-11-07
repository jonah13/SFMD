import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import {TitleService} from '../../../services/helpers/title.service';
import {MovieModelService} from '../../../models/movies/movie.model.service';
import {Movie} from '../../../models/movies/movie.interface';

@Component({
  selector: 'app-movies-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './movies-list.component.html',
  styleUrls: ['../../../../assets/styles/pages/movies-list.component.scss']
})
export class MoviesListComponent implements OnInit, OnDestroy {

  movies:Movie[] = [];
  queryTargets: string[] = ['title', 'release_year', 'production_company', 'director', 'distributor', 'actor_1', 'actor_2', 'actor_3'];
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
