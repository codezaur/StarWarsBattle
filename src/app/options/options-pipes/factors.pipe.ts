import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'factor'
})
export class FactorsPipe implements PipeTransform {

  transform(value: string): string {
    if (value === 'average_height' || value === 'height') {
        return 'height';
    } else if (value === 'average_lifespan') {
      return 'lifespan';
    } else if (value === 'films.length') {
      return 'fame';
    } else if (value === 'starships.length') {
      return 'combat experience';
    } else if (value === 'mass') {
      return 'mass';
    }
  }
}
