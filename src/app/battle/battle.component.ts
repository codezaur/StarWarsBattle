import { Component, OnInit } from '@angular/core';

import { GetForcesService } from './services/getForces.service';


@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {

  forces: any[] = [ {name: 'Player 1', resources: {}},
                    {name: 'Player 2',  resources: {}} ];

  constructor(private getForcesService: GetForcesService) { }

  async getPlayersForces() {
    try {
      await this.getForcesService.getForces();

      this.forces[0].resources = this.getForcesService.player1Forces;
      this.forces[1].resources = this.getForcesService.player2Forces;
    } catch (err) {
      console.log(err);
    }
  }

  ngOnInit() {
  }

}
