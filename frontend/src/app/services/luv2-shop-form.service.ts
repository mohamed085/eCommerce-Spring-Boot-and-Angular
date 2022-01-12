import { Injectable } from '@angular/core';
import {map, Observable, of} from "rxjs";
import { HttpClient } from "@angular/common/http";
import {Country} from "../common/country";
import {State} from "../common/state";

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private countriesUrl = "http://localhost:8080/api/countries"
  private statesUrl = "http://localhost:8080/api/states"

  constructor(private httpClient: HttpClient) { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {

    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetCountriesResponse>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    )
  }

  getStatesByCountryCode(countryCode: string): Observable<State[]> {
    const url = `${this.statesUrl}/search/findByCountryCode?code=${countryCode}`

    return this.httpClient.get<GetStatesResponse>(url).pipe(
      map(response => response._embedded.states)
    )
  }

}

interface GetCountriesResponse {
  _embedded: {
    countries: Country[]
  }
}

interface GetStatesResponse {
  _embedded: {
    states: State[]
  }
}
