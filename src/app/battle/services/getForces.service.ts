import { Injectable } from '@angular/core';

import { GetForcesAPIService } from './getForcesAPI.service';

@Injectable({providedIn: 'root'})
export class GetForcesService {

    randomNumber: number;
    player1Forces: {};
    player2Forces: {};

    constructor(private getForcesAPIService: GetForcesAPIService) {}

    pickRandomNumber() {
      const newRandom = Math.floor(Math.random() * 8) + 1;

      if (this.randomNumber !== newRandom) {
        this.randomNumber = newRandom;
      } else {
        this.pickRandomNumber();
      }
    }

    prepareForcesObject(resources: any) {
      return JSON.parse(resources.body);
    }

    async getForces() {

      this.pickRandomNumber();
      const forces1 = await this.getForcesAPIService.getForces(this.randomNumber);

      this.pickRandomNumber();
      const forces2 = await this.getForcesAPIService.getForces(this.randomNumber);

      this.player1Forces = this.prepareForcesObject(forces1);
      this.player2Forces =  this.prepareForcesObject(forces2);

      console.log('players in GF service: ');
      console.log(this.player1Forces);
      console.log(this.player2Forces);

    }
}
