import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html'
})
export class MovieItemComponent {
  @Input() movie: any = null;
  @Input() active: boolean = false;
  @Output() clicked = new EventEmitter<string>();
  
  onSelectMovie() {
    this.clicked.emit(this.movie.title);
    return false;
  }
}
