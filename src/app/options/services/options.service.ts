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


}
