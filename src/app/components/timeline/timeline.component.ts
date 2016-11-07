import { Component, ViewEncapsulation } from '@angular/core';
import {MovieModelService} from '../../models/movies/movie.model.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-timeline',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './timeline.component.html',
  styleUrls: ['../../../assets/styles/components/timeline.component.scss']
})
export class TimelineComponent {
  /**
   * decades to display on the timeline
   */
  decades: string[] = ['1910s', '1920s', '1930s', '1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s'];
  /**
   * array to hold years for each decade
   */
  years: string[] = [];
  /**
   * selected decade, year and movie based on user input
   */
  selectedYear: string = '';
  selectedDecade: string = '';
  selectedMovie: string = '';
  /**
   * movie model subscription, will allow us to unsubscribe when needed
   */
  _movieModelServiceSubscription: any;
  /**
   * sorting movies by year
   */
  moviesByYear: any = {};

  /**
   * injecting needed services
   */
  constructor(private _movieModelService:MovieModelService) {
  }

  /**
   * actions to perform on page init
   */
  ngOnInit() {
    this.onSelectedDecadeChange('2000s');
    this._movieModelServiceSubscription = this._movieModelService.observer$
      .subscribe(result => this.handleResponse(result));
  }

  /**
   * performing needed actions on selected decade change
   */
  onSelectedDecadeChange(selectedDecade: string) {
    this.selectedDecade = selectedDecade;
    let minYear = +selectedDecade.replace('s', '');
    let maxYear = minYear + 10;
    this.years = [];
    this.moviesByYear = {};
    this._movieModelService.list(encodeURI('&$where=release_year>='+minYear+' AND release_year<'+maxYear));
  }

  /**
   * performing needed actions on selected year change
   */
  onSelectedYearChange(selectedYear: string) {
    this.selectedYear = selectedYear;
    this.getYearsMoviesDetails();
  }

  /**
   * performing needed actions on selected movie change
   */
  onSelectedMovieChange(selectedMovie: string) {
    if (this.selectedMovie === selectedMovie) {
      this.selectedMovie = '';
    } else {
      this.selectedMovie = selectedMovie;
    }
  }

  /**
   * performing needed actions on selected year change
   */
  getYearsMoviesDetails() {
    this.moviesByYear[this.selectedYear].forEach(m => {
      this._movieModelService.viewDetails({t:m.title, y:m.release_year});
    });
  }

  /**
   * handle API response
   */
  handleResponse(response) {
    if (response.Response === 'True') {
      //secondary movie API
      let index = _.findIndex(this.moviesByYear[this.selectedYear], m => response['Title'].toLowerCase().replace('!', '').replace('?', '')
        .indexOf(m['title'].replace('!', '').replace('?', '').toLowerCase()) !== -1);
      if (index !== -1) {
        this.moviesByYear[this.selectedYear][index]['moreDetails'] = response;
      }
    } else {
      //primary movie API
      if (response && response.length) {
        for (let i = 0; i < response.length; i++) {
          if (!this.moviesByYear[response[i].release_year]) {
            this.moviesByYear[response[i].release_year] = [response[i]];
          } else {
            this.moviesByYear[response[i].release_year].push(response[i]);
          }
        }
        this.years = Object.keys(this.moviesByYear).sort();
        this.onSelectedYearChange(this.years[0]);
      }
    }
  }
}
