import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class OptionsService {

    battleType: string = 'species';

    constructor() {}

    setBattleType(type: string): void {
      this.battleType = type;
    }

    getBattleType(): string {
      return this.battleType;
    }

    getWiningConditions(battleType: string): any[] {
      if (battleType === 'species') {
        return ['average_height', 'average_lifespan', 'films.length'];
      } else if (battleType === 'people') {
        return ['mass', 'height', 'starships.length', 'films.length'];
      }

    }
}
