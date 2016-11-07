import {Injectable} from '@angular/core';
import {Endpoint} from '../../services/interfaces/interfaces';
import {ApiService} from '../../services/model/_api.service';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../../services/http/http.service';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';
import {CONFIG} from '../../shared/config';

@Injectable()
export class MovieApiService extends ApiService {
  /**
   * The kind-specific endpionts list.
   * For example, 'companies:list'
   */
  endpoints: Endpoint = {
    list: {uri: '?$select=title,release_year,production_company,actor_1,actor_2,actor_3,director,distributor&$group=title,release_year,production_company,actor_1,actor_2,actor_3,director,distributor&$order=title', verb: 'get'},
    view: {uri: '?title=', verb: 'get'},
    query: {uri: '?', verb: 'get'},
    viewDetails: {uri: '/?plot=full&tomatoes=true&r=json', verb: 'get'},
  };

  /**
   * The kind-specific error endpoint.
   * Used with the base API class to register error handlers.
   */
  err: string = 'movies:error';

  /**
   * The kind-specific string.
   * For example, 'messages'
   */
  kind: string = 'movies';

  /**
   * Registers the observer with public `observer$` property.
   * Then the kind-specific model service, for example, 'CandidateModel',
   * consumes this observer for listening to API changes.
   */
  observer$: Observable<Array<any>> = new Observable(observer =>
    this._observer = observer).share();

  /**
   * The Movie API service constructor function, invoked by base classes.
   */
  constructor(protected _http: HttpService,
              protected localStorageService: LocalStorageService) {
    super(_http);
  }

  list(params:string = ''):void {
    this._httpService.get(this.endpoints.list.uri+params, {})
      .subscribe(data => {
        data.forEach(m => {
          if (m['title'] === 'Another 48 Hours') {
            m['title'] = 'Another 48 Hrs';
          }
        });
        return this._observer.next(data);
      }, err => this._observer.error(err));
  }

  viewDetails(params:any = {}):void {
    let t = (params.t) ? '&t='+encodeURI(params.t) : '';
    let data = this.localStorageService.get_movie(encodeURI(params.t));
    if (!Date.now) {
      Date.now = function() { return new Date().getTime(); }
    }
    let now = Math.floor(Date.now() / 1000);

    if (data && data['timestamp'] && now - data['timestamp'] < CONFIG.LS_EXPIRATION) {
      this._observer.next(data);
    } else {
      this._httpService.get(this.endpoints.viewDetails.uri+t, {}, CONFIG.URI.OMDB)
        .subscribe(data => {
          if (data['Response'] === 'True') {
            this.localStorageService.set_movie(encodeURI(params.t), data);
          }
          this._observer.next(data);
        }, err => this._observer.error(err));
    }
  }
}
