import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {
  @Input() centerLat: number = 37.7720849;
  @Input() centerLng: number = -122.4262293;
  @Input() zoom: number = 12;
  @Input() markers: {lat:number, lng:number}[] = [];

  constructor() { }

  ngOnInit() {
  }

}
