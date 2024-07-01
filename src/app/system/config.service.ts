import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor() {
  }

  public getHostName(): string {
    let development = false
    if(development) return "http://localhost:5156"
    return `http://${window.location.hostname}:8080`
  }
}
