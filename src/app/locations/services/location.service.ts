import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Location} from "../models/location.model";
import {CreateLocationRequest} from "../models/create-location-request.model";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private server: string = "http://localhost:5156/api/v1/Locations";

  constructor(private http: HttpClient) { }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.server + "/all")
  }

  getLocation(code: string): Observable<Location> {
    return this.http.get<Location>(this.server + `/location/${code}`)
  }

  createLocation(newLocation: CreateLocationRequest): Observable<Location> {
    return this.http.post<Location>(`${this.server}/create`, newLocation)
  }

  deleteLocation(code: string): Observable<Location> {
    return this.http.delete<Location>(`${this.server}/delete/${code}`)
  }
}
