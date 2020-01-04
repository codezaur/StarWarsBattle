import { Component, OnInit } from '@angular/core';

import { OptionsService } from './services/options.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  battleTypes: any[] = [ {name: 'species', photo: 'species'},
                         {name: 'people', photo: 'vader'}];
  selectedBattleType: string = 'species';

  constructor(private optionsService: OptionsService) { }

  setBattleType(type: string): void {
    this.selectedBattleType = type;
    this.optionsService.setBattleType(type);
  }

  ngOnInit() {
  }

}
