import { Injectable } from '@angular/core';
import {BehaviorSubject, finalize, Observable} from "rxjs";
import {UserState} from "./user-state";
import {MessageService} from "primeng/api";
import {User} from "../models/user.model";
import {UserService} from "./user.service";
import {LoginRequest} from "../models/login-request.model";
import {LoginResponse} from "../models/login-response.model";
import {Router} from "@angular/router";
import {RegisterRequest} from "../models/register-request.model";
import {RegisterResponse} from "../models/register-response.model";

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private stateSubject = new BehaviorSubject<UserState>({
    token: null,
    user: null,
    loading: false,
    error: null
  });
  state$: Observable<UserState> = this.stateSubject.asObservable();

  constructor(private messageService: MessageService,private service: UserService, private router: Router) { }

  login(request: LoginRequest) {
    this.setLoading(true)
    this.service.login(request)
      .pipe(
        finalize(() => {
          this.setLoading(false)
        })
      ).subscribe({
        next: (response: LoginResponse) => {
          this.setToken(response.token);
          this.setUser(response.user);
          this.setError(null)
          this.router.navigate(["articles"])
        },
        error: (error) => {
          this.setError(error)
        }
    })
  }

  register(request: RegisterRequest) {
    this.setLoading(true)
    this.service.register(request)
      .pipe(
        finalize(() => {
          this.setLoading(false)
        })
      ).subscribe({
      next: (response: RegisterResponse) => {
        this.setToken(response.token);
        this.setUser(response.user);
        this.setError(null)
        this.router.navigate(["articles"])
      },
      error: (error) => {
        this.setError(error)
      }
    })
  }

  isLoggedIn(): boolean {
    return this.stateSubject.value.token !== null;
  }

  getToken(): string {
    return this.stateSubject.value.token!;
  }

  // State setters

  setLoading(loading: boolean) {
    this.setState({loading})
  }

  setError(error: string | null) {
    this.setState({error});
  }

  setUser(user: User | null) {
    this.setState({user})
  }

  setToken(token: string | null) {
    this.setState({token})
  }

  setState(partialState: Partial<UserState>){
    this.stateSubject.next({...this.stateSubject.value,...partialState})
  }
}
