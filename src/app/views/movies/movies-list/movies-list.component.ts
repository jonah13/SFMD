import { Component, OnInit } from '@angular/core';
import {TitleService} from '../../../services/helpers/title.service';
import {MovieModelService} from '../../../models/movies/movie.model.service';
import {Movie} from '../../../models/movies/movie.interface';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.sass']
})
export class MoviesListComponent implements OnInit {
  
  movies:Movie[] = [];

  constructor(private _movieModelService:MovieModelService,
              private pageTitle:TitleService) {

  }

  ngOnInit() {
    this._movieModelService.observer$
      .subscribe(result => this.handleResponse(result));
    this.pageTitle.setTitle('Companies');
    this._movieModelService.list();
  }

  handleResponse(result) {
    if (result) {
      this.movies = result;
    }
  }

}
