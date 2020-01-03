import { Component, OnInit } from '@angular/core';

import { GetForcesAPIService } from './services/getForcesAPI.service';


@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {


  forces: any[] = [{name: 'Player 1'}, {name: 'Player 2'}];

  constructor(private getForcesAPIService: GetForcesAPIService) { }

  async getPlayersForces() {
    console.log('calling...');
    await this.getForcesAPIService.getForces();
  }

  ngOnInit() {
  }

}
