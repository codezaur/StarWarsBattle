import { Component, OnInit } from '@angular/core';

import { GetForcesService } from './services/getForces.service';
import { OptionsService } from '../options/services/options.service'


@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {

  forces: any[] = [ {name: 'Player 1', resources: {}},
                    {name: 'Player 2',  resources: {}} ];

  selectedBattleType: string;

  constructor(private getForcesService: GetForcesService,
              private optionsService: OptionsService) { }

  async getPlayersForces() {
    this.selectedBattleType = this.optionsService.getBattleType();

    try {
      await this.getForcesService.getForces(this.selectedBattleType);

      this.forces[0].resources = this.getForcesService.player1Forces;
      this.forces[1].resources = this.getForcesService.player2Forces;
    } catch (err) {
      console.log(err);
    }
  }

  ngOnInit() {
  }

}
