import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() {
  }

  get_movie(title: string) {
    return JSON.parse(localStorage.getItem(title));
  }

  set_movie(title: string, data: any) {
    if (!Date.now) {
      Date.now = function() { return new Date().getTime(); }
    }

    data['timestamp'] = Math.floor(Date.now() / 1000);
    localStorage.setItem(title, JSON.stringify(data));
  }


}
