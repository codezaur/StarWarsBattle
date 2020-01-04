import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class GetForcesAPIService {

    constructor(private http: HttpClient) {}


    async getForces(randomNumber: number, battleType: string) {
        const options: {} = {
            headers: new HttpHeaders({
            Accept: 'application/json',
            'Content-Type': 'application/json'}),
            observe: 'response',
            responseType: 'text'
        };

        try {
          const res = await this.http
          .get(`https://swapi.co/api/${battleType}/${randomNumber}`, options).toPromise();
          return res;
        } catch (err) {
          return err;
        }
    }
}
