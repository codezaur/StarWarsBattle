import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class GetForcesAPIService {

    constructor(private http: HttpClient) {}


    async getForces() {
        const options: {} = {
            headers: new HttpHeaders({
            Accept: 'application/json',
            'Content-Type': 'application/json'}),
            observe: 'response',
            responseType: 'text'
        };

        const res = await this.http
            .get(`https://swapi.co/api/starships/9/`, options).toPromise();
        console.log('resp in API service:');
        console.log(res);
        return res;
    }
}
