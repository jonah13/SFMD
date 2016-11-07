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
  /**
   * array to hold list of movies
   */
  movies:Movie[] = [];
  /**
   * list of keys we want to be able to search in
   */
  queryTargets: string[] = ['title', 'release_year', 'production_company', 'director', 'distributor', 'actor_1', 'actor_2', 'actor_3'];
  _movieModelServiceSubscription: any;

  /**
   * injecting needed services
   * @param _movieModelService
   * @param pageTitle
   */
  constructor(private _movieModelService:MovieModelService,
              private pageTitle:TitleService) {
  }

  /**
   * actions to perform on page init
   */
  ngOnInit() {
    this._movieModelServiceSubscription = this._movieModelService.observer$
      .subscribe(result => this.handleResponse(result));
    this.pageTitle.setTitle('Companies');
    this._movieModelService.list();
  }

  /**
   * actions to perform before leaving the page
   */
  ngOnDestroy() {
    this._movieModelServiceSubscription.unsubscribe();
  }

  /**
   * handling API response
   * @param result
   */
  handleResponse(result: any) {
    if (result && result.length) {
      this.movies = result;
    }
  }

}
