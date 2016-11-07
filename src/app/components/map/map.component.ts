import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['../../../assets/styles/components/map.component.scss']
})
export class MapComponent {
  /**
   * center point of the map
   */
  @Input() centerLat: number = 37.7720849;
  @Input() centerLng: number = -122.4262293;
  /**
   * Map zoom value
   */
  @Input() zoom: number = 12;
  /**
   * list of markers
   */
  @Input() markers: {lat:number, lng:number}[] = [];
}
