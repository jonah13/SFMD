import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../../../assets/styles/components/menu.component.scss']
})
export class MenuComponent {
  /**
   * css class for the menu 
   */
  @Input() menuClass: string = 'default';
  /**
   * menu elements
   */
  @Input() elements: string[] = [];
  /**
   * menu active element
   */
  @Input() active: string = '';
  /**
   * Event to fire when an element is clicked
   */
  @Output() menuItemClicked = new EventEmitter<string>();

  /**
   * on click function
   * @param elmt
   * @returns {boolean}
   */
  onClick(elmt: string): boolean {
    this.menuItemClicked.emit(elmt);
    return false;
  }
}
