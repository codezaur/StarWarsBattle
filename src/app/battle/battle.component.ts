import { Component, OnInit } from '@angular/core';

import { GetForcesService } from './services/getForces.service';
import { OptionsService } from '../options/services/options.service'


@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {

  forces: any[];

  selectedBattleType: string;

  battleResults: object | string;

  battleResolved: boolean;

  comparedFactor: string | number;

  constructor(private getForcesService: GetForcesService,
              private optionsService: OptionsService) { }

  determineWinner(battleType: string): object | string {

    const winningFactors = this.optionsService.getWiningConditions(battleType);

    let winner: any;
    let forces1: number;
    let forces2: number;

    for (let factor of winningFactors) {

      if (factor === 'films.length') {
        forces1 = parseInt(this.forces[0].resources.films.length, 10);
        forces2 = parseInt(this.forces[1].resources.films.length, 10);
        this.comparedFactor = this.forces[0].resources.films.length;
      } else {
        forces1 = parseInt(this.forces[0].resources[factor], 10);
        forces2 = parseInt(this.forces[1].resources[factor], 10);
        this.comparedFactor = this.forces[0].resources[factor];
      }

      if ( isNaN(forces1) || isNaN(forces2) ) {
        winner = `These two couldn't fight and battle could't be resolved. \
                  Try again - call reinforcement.`;
        this.battleResolved = false;
      } else if (forces1 === forces2) {
        winner = `Dead heat. These two forces seem to be equally strong. \
                  Try again - call reinforcement.`;
        this.battleResolved = false;
      } else if (forces1 > forces2) {
        winner = this.forces[0];
        winner.isWinner = true;
        this.battleResolved = true;
        return winner;
      } else if (forces1 < forces2) {
        winner = this.forces[1];
        winner.isWinner = true;
        this.battleResolved = true;
        return winner;
      }
    }
    return winner;
  }

  async startBattle() {
    this.selectedBattleType = this.optionsService.getBattleType();

    try {
      const newForces: object = await this.getForcesService.getForces(this.selectedBattleType);

      this.forces[0].resources = newForces[0];
      this.forces[1].resources = newForces[1];

      this.battleResults = this.determineWinner(this.selectedBattleType);


    } catch (err) {
      console.log(err);
    }
  }


  ngOnInit() {
    this.initiateForcesArray();
  }

  initiateForcesArray() {
    this.forces = [
      {name: 'Player 1', resources: {films: [], starships: []}},
      {name: 'Player 2',  resources: {films: [], starships: []}} ];
  }
}
