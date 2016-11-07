import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['../../../assets/styles/components/search.component.scss']
})
export class SearchComponent {
  /**
   * placeholder text
   */
  @Input('placeholder') placeholder = 'Filter ...';
  /**
   * event fired when query changes
   */
  @Output() queryChanged = new EventEmitter<string>();

  /**
   * actions to perform on query change
   * @param query
   */
  onQueryChanged(query: string) {
    this.queryChanged.emit(query);
  }
}
