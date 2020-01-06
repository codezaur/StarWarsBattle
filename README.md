# Star Wars Battles

This project was made with use of Star Wars API (https://swapi.co/) and generated with version 7.3.8.

## To run on you local server

Fork repo. In your fork press 'Clone or Download', then in terminal `git clone` + copied URL.
Run `ng serve`. 
Navigate to `http://localhost:4200/`.

## Game mechanics

Game will get two random heros or species from  API, and declare one of them winner basing on given criteria.
For each battle type (person vs person or speciec vs species) there are set of winning criteria. 
It will check them one be one in order they're displayed in 'Set winning conditions' section. 

If one of heroes/species is stronger regarding to current factor, it declares him/her a winner, and end round, if their forces are equal or undefined, it moves to next criteria. 
If it cannot find winned after checking all criteria, it declares dead heat (equal forces) or battle not taking place (undefined values). 

