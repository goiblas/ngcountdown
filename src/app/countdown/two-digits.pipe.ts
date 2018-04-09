import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twoDigits'
})
export class TwoDigitsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value < 10 ? '0' + value : value;
  }

}
