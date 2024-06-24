import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {LoginRequest} from "../users/models/login-request.model";
import {UserStateService} from "../users/services/user-state.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  loginForm: FormGroup = new FormGroup({})

  constructor(
    private messageService: MessageService,
    private router: Router,
    protected state: UserStateService
  ) { }

  ngOnInit(){
    if(this.state.isLoggedIn()) this.router.navigate(["articles"])

    this.initializeForms();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  private initializeForms(){
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl("", [
        Validators.required
      ])
    }, {updateOn:'change'});
  }

  login() {
    let request: LoginRequest = {
      email: this.loginForm.value.email as string,
      password: this.loginForm.value.password as string
    };

    this.state.login(request)
  }

  checkAndLogin() {
    if(this.loginForm.valid) {
      this.login()
    }
  }

  navigateToRegister() {
    this.router.navigate(["register"])
  }
}
