import {Injectable} from '@angular/core';
import {Endpoint} from '../../services/interfaces/interfaces';
import {ModelService} from '../../services/model/_model.service';
import {Observable} from 'rxjs/Observable';
import {GeocodingApiService} from './geocoding.api.service';

@Injectable()
export class GeocodingModelService extends ModelService {
  /**
   * Registers the observer with public `observer$` property.
   * Then the components, for example, 'ConversationListComponent',
   *   consumes this observer for listening to Model changes.
   */
  observer$:Observable<Array<any>>;

  /**
   * Reference to available API endpoints from kind-specific API service.
   * Used with the base class to factory-out endpoints for each CRUD operation.
   */
  protected _APIEndpoints:Endpoint;

  /**
   * The private observer holder, stores the observer for later use.
   */
  protected _observer:any;

  /**
   * The private data store, stores the retrieved messages for later use.
   */
  protected _dataStore:any[] = [];

  /**
   * The BusinessModel service constructor function, invokes the base Model.
   */
  constructor(_api:GeocodingApiService) {
    super(_api);
  }

}
