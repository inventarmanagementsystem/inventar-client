import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {LocationState} from "./location-state";
import {MessageService} from "primeng/api";
import {LocationService} from "./location.service";
import {CreateLocationRequest} from "../models/create-location-request.model";
import {Location} from "../models/location.model";

@Injectable({
  providedIn: 'root'
})
export class LocationStateService {
  private stateSubject = new BehaviorSubject<LocationState>({
    locations: [],
    loading: false,
    error: null
  });
  state$: Observable<LocationState> = this.stateSubject.asObservable();

  constructor(private messageService: MessageService,private service: LocationService) { }

  // Service calls

  createLocation(request: CreateLocationRequest){
    this.setLoading(true)
    this.service.createLocation(request).subscribe({
      next: (newLocation) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Location ${request.code} was created` });
        this.addLocation(newLocation)
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoading(false)
      }
    })
  }

  deleteLocation(code: string) {
    this.setLoading(true)
    this.service.deleteLocation(code).subscribe({
      next: () => {
        this.removeLocation(code)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Location ${code} was deleted` });
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoading(false)
      }
    })
  }

  getLocation(code: string){
    this.setLoading(true)
    return this.service.getLocation(code)
  }

  getLocations(){
    this.setLoading(true)
    return this.service.getLocations()
  }

  // State updaters

  addLocation(newLocation: Location) {
    let locations: Location[] = [...this.stateSubject.value.locations, newLocation]
    this.setState({locations})
  }

  removeLocation(code: string){
    let oldLocations: Location[] = this.stateSubject.value.locations
    let locations: Location[] = []

    oldLocations.forEach(p => {
      if(p.code != code) locations.push(p)
    })

    this.setState({locations})
  }

  // State setters

  setLoading(loading: boolean) {
    this.setState({loading})
  }

  setError(error: string | null) {
    this.setState({error});
  }

  setLocations(locations: Location[]) {
    this.setState({locations})
  }


  setState(partialState: Partial<LocationState>){
    this.stateSubject.next({...this.stateSubject.value,...partialState})
  }
}
