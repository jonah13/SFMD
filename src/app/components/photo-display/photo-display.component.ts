import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo-display',
  templateUrl: './photo-display.component.html'
})
export class PhotoDisplayComponent {
  @Input() movies: any[] = [];
  @Input() selectedMovie: any = null;
  
}
