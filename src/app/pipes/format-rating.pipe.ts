import { Pipe, PipeTransform } from '@angular/core';
/*
 * format rating to avoid displaying N/A or undefined
 * Usage:
 *   rating | formatRating
 */
@Pipe({
  name: 'formatRating'
})
export class FormatRatingPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value || value.toLowerCase() === 'n/a') {
      return '--'
    }
    return value;
  }
}
