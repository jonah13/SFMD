import { Pipe, PipeTransform } from '@angular/core';
import {ArrayUtils} from '../shared/utils/array.utils';

/*
 * filters Elements by target fields
 * Usage:
 *   elements[] | QueryFilter:target:query
 */
@Pipe({
  name: 'queryFilter'
})
export class QueryFilterPipe implements PipeTransform {
  transform(elements:any[], targets:[string], query:string):any[] {
    if (!query || !targets) {
      return elements;
    }
    let result: any[] = [];
    for(let elmt of elements) {
      for(let target of targets) {
        if(elmt[target]) {
          if(Array.isArray(elmt[target])) {
            if(ArrayUtils.any(elmt[target], subElmt => ( subElmt.toLowerCase().includes(query.toLowerCase()) ) )) {
              if(result.indexOf(elmt) === -1) {
                result.push(elmt);
              }
            }
          } else {
            if(elmt[target].toLowerCase().includes(query.toLowerCase()) && result.indexOf(elmt) === -1) {
              result.push(elmt);
            }
          }
        }
      }
    }
    return result;
  }
}
