import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['../../../assets/styles/components/search.component.scss']
})
export class SearchComponent {
  @Input('placeholder') placeholder = 'Filter ...';
  @Output() queryChanged = new EventEmitter<string>();

  onQueryChanged(query:string) {
    this.queryChanged.emit(query);
  }
}
