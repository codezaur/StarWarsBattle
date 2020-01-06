import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { OptionsComponent } from './options.component';
import { OptionsService } from './services/options.service';

import { FactorsPipe } from './options-pipes/factors.pipe';

import {HttpClientTestingModule } from '@angular/common/http/testing';

describe('OptionsComponent', () => {
  let component: OptionsComponent;
  let fixture: ComponentFixture<OptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsComponent, FactorsPipe ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ HttpClientTestingModule ],
      providers: [ OptionsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update winning conditions array according to checkbox click', () => {
    component.winningOptions = [{name: 'mass', isApplied: true},
                                {name: 'height', isApplied: true},
                                {name: 'starships.length', isApplied: true},
                                {name: 'films.length', isApplied: true}];

    fixture.componentInstance.handleCheckboxClicks(1);
    expect(component.winningOptions).toEqual([{name: 'mass', isApplied: true},
                                              {name: 'height', isApplied: false},
                                              {name: 'starships.length', isApplied: true},
                                              {name: 'films.length', isApplied: true}]);
  });
});
