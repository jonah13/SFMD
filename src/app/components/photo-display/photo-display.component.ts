import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo-display',
  templateUrl: './photo-display.component.html',
  styleUrls: ['../../../assets/styles/components/photo-display.component.scss']
})
export class PhotoDisplayComponent 
{
  /**
   * movies array to get photos from
   */
  @Input() movies: any[] = [];
  /**
   * selected movie to highlight
   */
  @Input() selectedMovie: any = null;
  /**
   * hovered movie to highlight
   */
  @Input() hoveredMovie: any = null;
}
