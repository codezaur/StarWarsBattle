import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BattleComponent } from './battle.component';

import { ForcesService } from './services/forces.service';
import { OptionsService } from '../options/services/options.service';

import {HttpClientTestingModule } from '@angular/common/http/testing';


describe('BattleComponent', () => {
  let component: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ HttpClientTestingModule ],
      providers: [ ForcesService, OptionsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initiate forces array with name and resources object', () => {
    expect(component.forces[0]).toEqual({name: 'Player 1', resources: {films: [], starships: []}});
  });

  it('should use BattleType from options service', () => {
    const optionsSvc = fixture.debugElement.injector.get(OptionsService);
    optionsSvc.setBattleType('people');
    fixture.componentInstance.startBattle();
    expect(component.selectedBattleType).toEqual('people');
  });

  it('should check next set of winning criteria in case of draw/undefined values', () => {
    const factors = [{name: 'mass', isApplied: true},
                     {name: 'height', isApplied: true},
                     {name: 'starships.length', isApplied: true},
                     {name: 'films.length', isApplied: true}];


    component.forces = [{name: 'Player 1', resources:
                        {name: 'Darth Maul', mass: '80', height: '195'} },
                        {name: 'Player 1', resources:
                        {name: 'Adi Gallia', mass: '80', height: '175' }}];

    const winner = fixture.componentInstance.compareForces(factors);
    expect(winner).toEqual(fixture.componentInstance.forces[0]);
  });

  it('should stop iterating and select winner when one value is higher', () => {
    const factors = [{name: 'mass', isApplied: true},
    {name: 'height', isApplied: true},
    {name: 'starships.length', isApplied: true},
    {name: 'films.length', isApplied: true}];

    component.forces = [{name: 'Player 1', resources:
    {name: 'Darth Maul', mass: '90', height: '165'} },
    {name: 'Player 1', resources:
    {name: 'Adi Gallia', mass: '80', height: '195' }}];

    const winner = fixture.componentInstance.compareForces(factors);
    expect(winner).toEqual(fixture.componentInstance.forces[0]);
  });

  it('should select correct winner according to provided winning factors', () => {
    component.forces = [{name: 'Player 1', resources:
                        {name: 'Darth Maul',
                        height: '75',
                        mass: '80',
                        films: ['https://swapi.co/api/films/4/',
                        'https://swapi.co/api/films/5/',
                        'https://swapi.co/api/films/6/'],
                        starships: ['https://swapi.co/api/starships/41/',
                        'https://swapi.co/api/starships/42/']}},

                        {name: 'Player 2', resources:
                        {name: 'Adi Gallia',
                        height: '195',
                        mass: '150',
                        films: ['https://swapi.co/api/films/4/'],
                        starships: []}}
    ];

    const optionsSvc = fixture.debugElement.injector.get(OptionsService);
    optionsSvc.setBattleType('people');
    optionsSvc.setWinningConditions([{name: 'mass', isApplied: false},
                                    {name: 'height', isApplied: false},
                                    {name: 'starships.length', isApplied: true},
                                    {name: 'films.length', isApplied: true}],
                                    'people');

    const winner = fixture.componentInstance.determineWinner('people');

    expect(winner).toEqual(component.forces[0]);
  });

});
