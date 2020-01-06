import { Injectable } from '@angular/core';

import { ForcesAPIService } from './forcesAPI.service';

@Injectable({providedIn: 'root'})
export class ForcesService {

    randomNumber: number;

    constructor(private forcesAPIService: ForcesAPIService) {}

    pickRandomNumber(battleType: string): void {

      let numberOfItems: number;
      if (battleType === 'people') {
        numberOfItems = 88;
      } else if (battleType === 'vehicles') {
        numberOfItems = 40;
      } else if (battleType === 'starships') {
        numberOfItems = 38;
      } else if (battleType === 'species') {
        numberOfItems = 38;
      }

      const newRandom = Math.floor(Math.random() * numberOfItems) + 1;

      if (this.randomNumber !== newRandom) {
        this.randomNumber = newRandom;
      } else {
        this.pickRandomNumber(battleType);
      }
    }

    prepareForcesObject(resources: any): object {
      return JSON.parse(resources.body);
    }

    async getNewForces(battleType: string): Promise<object> {
      this.pickRandomNumber(battleType);
      const forces = await this.forcesAPIService.getForces(this.randomNumber, battleType);
      return forces;
    }

    async getForces(battleType: string): Promise<object> {

      const forces1 = await this.getNewForces(battleType);
      const forces2 = await this.getNewForces(battleType);

      const forces1Obj: object = this.prepareForcesObject(forces1);
      const forces2Obj: object =  this.prepareForcesObject(forces2);

      return [forces1Obj, forces2Obj];
    }
}
