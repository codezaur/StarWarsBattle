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

  showWinningOptions: boolean = null;
  winningOptions: any[] = [];

  constructor(private optionsService: OptionsService) { }

  setBattleType(type: string): void {
    this.selectedBattleType = type;
    this.optionsService.setBattleType(type);
  }

  toggleWinningOptions(): void {
    this.showWinningOptions = this.showWinningOptions === (false || null) ? true : false;

    if (this.showWinningOptions) {
      this.winningOptions = this.optionsService.getWiningConditions(this.selectedBattleType);
    }

    if (this.showWinningOptions === false) {
      setTimeout(() => { this.showWinningOptions = null; }, 400);
    }
  }

  handleCheckboxClicks(index: number) {
    this.winningOptions[index].isApplied = this.winningOptions[index].isApplied === false ? true : false;
    this.optionsService.setWinningConditions(this.winningOptions, this.selectedBattleType);
  }

  ngOnInit() {
  }

}
