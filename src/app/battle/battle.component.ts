import { Component, OnInit } from '@angular/core';

import { ForcesService } from './services/forces.service';
import { OptionsService } from '../options/services/options.service';


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

  error = {msg: ''};

  waitingForAPIResponse: boolean = false;

  constructor(private forcesService: ForcesService,
              private optionsService: OptionsService) { }

  compareForces(factors: any[]): object | string {

    let winner: any;
    let forces1: number;
    let forces2: number;

    for (const factor of factors) {
      console.log('FORCES');
      console.log(this.forces);

      this.comparedFactor = factor.name;

      if (factor.name === 'films.length') {
        forces1 = parseInt(this.forces[0].resources.films.length, 10);
        forces2 = parseInt(this.forces[1].resources.films.length, 10);
      } else {
        forces1 = parseInt(this.forces[0].resources[factor.name], 10);
        forces2 = parseInt(this.forces[1].resources[factor.name], 10);
      }

      if ( isNaN(forces1) || isNaN(forces2) ) {
        winner = `These two couldn't fight and battle didn't even started. \
                  Try again - call reinforcement.`;
        this.battleResolved = false;
      } else if (forces1 === forces2) {
        winner = `Dead heat. These two seem to be equall in force. \
                  Try again - call reinforcement.`;
        this.battleResolved = false;
      } else if (forces1 > forces2) {
        winner = this.forces[0];
        winner.isWinner = true;
        winner.score = winner.score + 1 || 1;
        this.battleResolved = true;
        return winner;
      } else if (forces1 < forces2) {
        winner = this.forces[1];
        winner.isWinner = true;
        winner.score = winner.score + 1 || 1;
        this.battleResolved = true;
        return winner;
      }
    }
    return winner;
  }

  determineWinner(battleType: string): object | string {

    let winningFactors = this.optionsService.getWiningConditions(battleType);
    winningFactors = winningFactors.filter(item => item.isApplied === true);

    return this.compareForces(winningFactors);
  }


  clearGameData() {
    this.forces.forEach( (force) => force.isWinner = false);
    this.comparedFactor = '';
    this.error = {msg: ''};
  }

  async startBattle() {

    this.clearGameData();

    this.waitingForAPIResponse = true;

    this.selectedBattleType = this.optionsService.getBattleType();

    try {
      const newForces: object = await this.forcesService.getForces(this.selectedBattleType);

      this.forces[0].resources = newForces[0];
      this.forces[1].resources = newForces[1];

      this.waitingForAPIResponse = false;
      this.battleResults = this.determineWinner(this.selectedBattleType);

    } catch (err) {
      this.error.msg = err.error;
      this.waitingForAPIResponse = false;
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
