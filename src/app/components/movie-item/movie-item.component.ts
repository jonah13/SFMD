import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['../../../assets/styles/components/movie-item.component.scss']
})
export class MovieItemComponent {
  /**
   * Movie to display
   */
  @Input() movie: any = null;
  /**
   * is active flad
   */
  @Input() active: boolean = false;
  /**
   * event to fire when a movie is selected
   */
  @Output() clicked = new EventEmitter<string>();

  /**
   * actions to perform when a movie is clicked
   * @returns {boolean}
   */
  onSelectMovie(): boolean {
    this.clicked.emit(this.movie.title);
    return false;
  }
}
