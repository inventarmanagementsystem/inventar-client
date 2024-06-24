import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConfigService} from "../../system/config.service";
import {LoginRequest} from "../models/login-request.model";
import {LoginResponse} from "../models/login-response.model";
import {RegisterRequest} from "../models/register-request.model";
import {RegisterResponse} from "../models/register-response.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = '';
  private server: string = '';

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.getHostName();
    this.server = `${this.apiUrl}/api/v1/Users`
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.server + "/login", request)
  }

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.server + "/register", request)
  }
}
