import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ArticlePageComponent} from "./articles/article-page/article-page.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RatingModule} from "primeng/rating";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {MessageModule} from "primeng/message";
import {DropdownModule} from "primeng/dropdown";
import {ConfirmationService, MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {HttpErrorInterceptor} from "./interceptors/http-error.interceptor";
import { NavbarComponent } from './navbar/navbar.component';
import { LocationPageComponent } from './locations/location-page/location-page.component';
import { ArticleLocationPageComponent } from './article-locations/article-location-page/article-location-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlePageComponent,
    NavbarComponent,
    LocationPageComponent,
    ArticleLocationPageComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RatingModule,
    TableModule,
    ToastModule,
    MessageModule,
    DropdownModule,
    ButtonModule,
    RippleModule,
    BrowserAnimationsModule,
    ConfirmPopupModule,
    ReactiveFormsModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HttpErrorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
