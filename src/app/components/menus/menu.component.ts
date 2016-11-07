import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  @Input() menuClass: string = 'default';
  @Input() elements: string[] = [];
  @Input() active: string = '';
  @Output() menuItemClicked = new EventEmitter<string>();

  onClick(elmt) {
    this.menuItemClicked.emit(elmt);
    return false;
  }
}
