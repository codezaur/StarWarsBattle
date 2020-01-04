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

  constructor(private getForcesService: GetForcesService,
              private optionsService: OptionsService) { }

  determineWinner(battleType: string) {

    const winningFactor = this.optionsService.getWiningConditions(battleType)[0];
    let winner: any;
    let forces1 = parseInt(this.forces[0].resources[winningFactor], 10);
    let forces2 = parseInt(this.forces[1].resources[winningFactor], 10);

    console.log('WINNER IS: ... ');
    console.log(winningFactor);
    console.log(this.forces[0].resources[winningFactor]);
    console.log(this.forces[1].resources[winningFactor]);

    if ( isNaN(forces1) || isNaN(forces2) ) {
      winner = 'Could not resolve battle';
    } else if (forces1 === forces2) {
      winner = 'dead heat';
    } else if (forces1 > forces2) {
      winner = this.forces[0];
    } else if (forces1 < forces2) {
      winner = this.forces[1];
    }

    winner.isWinner = true;
    console.log(winner);
    return winner;

  }

  async startBattle() {
    this.selectedBattleType = this.optionsService.getBattleType();

    try {
      const newForces: object = await this.getForcesService.getForces(this.selectedBattleType);

      this.forces[0].resources = newForces[0];
      this.forces[1].resources = newForces[1];

      this.determineWinner(this.selectedBattleType);


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
