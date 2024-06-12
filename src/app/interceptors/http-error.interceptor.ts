import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { MessageService } from "primeng/api";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor{
  constructor(private messageService: MessageService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = this.getErrorMessage(error);
          if(!this.ignoreMessage(error)){
            this.displayError(error, errorMessage);
          }
          return throwError(() => new Error(errorMessage))
        })
      )
  }

  ignoredMessages: string[] = [

  ]

  private ignoreMessage(error: HttpErrorResponse): boolean {
    let msg: string;

    if(error.error instanceof ErrorEvent){
      msg = error.error.message;
    }
    else{
      msg = error.error;
    }

    for(let i = 0; i < this.ignoredMessages.length; i++){
      if(this.ignoredMessages[i] === msg){
        return true;
      }
    }
    return false;
  }

  private getErrorMessage(error: HttpErrorResponse): string{
    if(error.error instanceof ErrorEvent){
      return `Client-side error: ${error.error.message}`
    }
    else{
      return `Server-side error: ${error.error}`
    }
  }

  private displayError(error: HttpErrorResponse, errorMessage: string): void {
    let summary = `${error.status}`;

    if(error.status === 0) {
      summary = "API Connection Failed"
      errorMessage = "Development state variable (config.service.ts) is set to the wrong value or there is another server issue."
    }

    this.messageService.add({
      severity: 'error',
      summary,
      detail: errorMessage
    })
  }
}
