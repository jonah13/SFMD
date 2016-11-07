import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {CONFIG} from '../../shared/config';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {
  private baseUri:String;

  /**
   * The kind-specific endpionts list.
   * For example, 'messages:create'.
   */
  constructor(private _http:Http) {
    this.baseUri = CONFIG.URI.BASE;
  }

  /**
   * Sets the auth header by default if any RequestOptionArgs is not defined
   * @param options
   * @param baseUri
   * @returns {{headers: (Headers|{})}|RequestOptionsArgs}
   */
  requestOptionsArgs(options?:RequestOptionsArgs, baseUri = this.baseUri):any {
    if (_.isEmpty(options)) {
      let headers = new Headers();
      if (baseUri === this.baseUri) {
        headers.append('X-App-Token', CONFIG.API_TOKEN);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json;charset=utf-8');
      }
      return {headers: headers};
    } else {
      return options;
    }
  }

  /**
   * Sends a get request.
   * @param uri
   * @param options
   * @param baseUri
   * @returns {Observable<R>}
   */
  get(uri:string, options?:RequestOptionsArgs, baseUri = this.baseUri):Observable<any> {
    return this._http.get(this.endPointFullUrl(uri, baseUri), this.requestOptionsArgs(options, baseUri))
      .map(response => {
        try {
          return response.json();
        } catch (err) {
          /*In case if response body is empty, 200 response code also invokes
           error handlers as empty 'response.json()' throws exception.
           This way an undefined object is returned as the response object
           which can easily be handled in the success observers down the chain.
           */
        }
      });
  }

  /**
   * Sends a post request.
   * @param uri
   * @param body
   * @param options
   * @returns {Observable<R>}
   */
  post(uri:string, body:string, options?:RequestOptionsArgs):Observable<any> {
    return this._http.post(this.endPointFullUrl(uri), body, this.requestOptionsArgs(options))
      .map(response => response.json());
  }

  /**
   *
   * @param uri
   * @param body
   * @param options
   * @returns {Observable<R>}
   */
  put(uri:string, body:string, options?:RequestOptionsArgs):Observable<any> {
    return this._http.put(this.endPointFullUrl(uri), body, this.requestOptionsArgs(options))
      .map(response => response.json());
  }


  /**
   * @param uri
   * @param options
   * @returns {Observable<R>}
   */
  destroy(uri:string, options?:RequestOptionsArgs):Observable<any> {
    return this._http.delete(this.endPointFullUrl(uri), this.requestOptionsArgs(options))
      .map(response => response.json());
  }

  /**
   * concatenates the uri with baseUri
   * @param uri
   * @param baseUri
   * @returns {string}
   */
  endPointFullUrl(uri:string, baseUri = this.baseUri):string {
    return baseUri.concat(uri);
  }
}
