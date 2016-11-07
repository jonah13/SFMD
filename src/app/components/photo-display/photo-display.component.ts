import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo-display',
  templateUrl: './photo-display.component.html',
  styleUrls: ['../../../assets/styles/components/photo-display.component.scss']
})
export class PhotoDisplayComponent {
  @Input() movies: any[] = [];
  @Input() selectedMovie: any = null;
  
}
