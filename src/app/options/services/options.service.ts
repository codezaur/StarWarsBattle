import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class OptionsService {

    battleType: string = 'species';

    winningConditions = {species: [{name: 'average_height', isApplied: true},
                                    {name: 'average_lifespan', isApplied: true},
                                    {name: 'films.length', isApplied: true} ],
                        people:   [{name: 'mass', isApplied: true},
                                   {name: 'height', isApplied: true},
                                   {name: 'starships.length', isApplied: true},
                                   {name: 'films.length', isApplied: true}] };

    constructor() {}

    setBattleType(type: string): void {
      this.battleType = type;
    }

    getBattleType(): string {
      return this.battleType;
    }

    setWinningConditions(conditions: any[], battleType: string) {
      this.winningConditions[battleType] = conditions;
    }

    getWiningConditions(battleType: string): any[] {
      return this.winningConditions[battleType];
    }
}
