import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {UserStateService} from "../users/services/user-state.service";
import {ConfigService} from "../system/config.service";

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  private token: string | null = null;

  constructor(
    private userState: UserStateService, private config: ConfigService) {}

  intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.includes(`${this.config.getHostName()}/register`) || request.url.includes(`${this.config.getHostName()}/login`)){
      return handler.handle(request);
    }

    this.getCurrentToken();
    const httpRequest = request.clone({
      setHeaders:{Authorization: `Bearer ${this.token}`}
    });
    return handler.handle(httpRequest);
  }

  getCurrentToken(): void {
    this.userState.state$.subscribe(data => {
      this.token = data.token;
    })
  }
}
