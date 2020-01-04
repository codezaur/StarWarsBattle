import { Injectable } from '@angular/core';

import { GetForcesAPIService } from './getForcesAPI.service';

@Injectable({providedIn: 'root'})
export class GetForcesService {

    randomNumber: number;
    player1Forces: {};
    player2Forces: {};

    constructor(private getForcesAPIService: GetForcesAPIService) {}

    pickRandomNumber(battleType: string) {

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

    prepareForcesObject(resources: any) {
      return JSON.parse(resources.body);
    }

    async getNewForces(battleType: string): Promise<object> {
      this.pickRandomNumber(battleType);
      const forces = await this.getForcesAPIService.getForces(this.randomNumber, battleType);
      return forces;
    }

    async getForces(battleType: string) {

      const forces1 = await this.getNewForces(battleType);
      const forces2 = await this.getNewForces(battleType);

      this.player1Forces = this.prepareForcesObject(forces1);
      this.player2Forces =  this.prepareForcesObject(forces2);

      console.log('players in GF service: ');
      console.log(this.player1Forces);
      console.log(this.player2Forces);

    }
}
