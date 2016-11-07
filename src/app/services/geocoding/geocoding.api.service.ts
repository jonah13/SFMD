import {Injectable} from '@angular/core';
import {Endpoint} from '../../services/interfaces/interfaces';
import {ApiService} from '../../services/model/_api.service';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../../services/http/http.service';
import {CONFIG} from '../../shared/config';

@Injectable()
export class GeocodingApiService extends ApiService {
  /**
   * The kind-specific endpionts list.
   * For example, 'companies:list'
   */
  endpoints: Endpoint = {
    list: {uri: '&address=', verb: 'get'}
  };

  /**
   * The kind-specific error endpoint.
   * Used with the base API class to register error handlers.
   */
  err: string = 'geocoding:error';

  /**
   * The kind-specific string.
   * For example, 'messages'
   */
  kind: string = 'geocoding';

  /**
   * Registers the observer with public `observer$` property.
   * Then the kind-specific model service, for example, 'CandidateModel',
   * consumes this observer for listening to API changes.
   */
  observer$: Observable<Array<any>> = new Observable(observer =>
    this._observer = observer).share();

  /**
   * The geocoding API service constructor function, invoked by base classes.
   */
  constructor(protected _http: HttpService) {
    super(_http);
  }

  list(params:any = {}):void {
    console.log('params: ', params);
    this._httpService.get(this.endpoints.list.uri+params, {}, CONFIG.URI.GOOGLE_GEOCODING)
      .subscribe(data => this._observer.next(data),
        err => this._observer.error(err));
  }
}
