import { Component } from '@angular/core';
import {CONFIG} from '../../shared/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../../assets/styles/components/header.component.scss']
})
export class HeaderComponent {
  path: string = CONFIG.ASSETS_PATH;
}
