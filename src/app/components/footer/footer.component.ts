import { Component, ViewEncapsulation } from '@angular/core';
import {CONFIG} from '../../shared/config';

@Component({
  selector: 'app-footer',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './footer.component.html',
  styleUrls: ['../../../assets/styles/components/footer.component.scss']
})
export class FooterComponent {
  path: string = CONFIG.ASSETS_PATH;
}
