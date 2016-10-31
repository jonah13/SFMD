import { Component, OnInit } from '@angular/core';
import {TitleService} from '../../../services/helpers/title.service';
import {MovieModelService} from '../../../models/movies/movie.model.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.sass']
})
export class MoviesListComponent implements OnInit {

  constructor(private _movieModelService:MovieModelService,
              private pageTitle:TitleService) {

  }

  ngOnInit() {
    this._movieModelService.observer$
      .subscribe(result => this.handleResponse(result));
    this.pageTitle.setTitle('Companies');
  }

  handleResponse(result) {
    console.log(result);
  }

}
