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
import { ArticleLocationHistoryPageComponent } from './article-locations/article-location-history-page/article-location-history-page.component';
import {OverlayPanelModule} from "primeng/overlaypanel";
import {
  PrintArticleLocationsComponent
} from "./article-locations/print-article-locations/print-article-locations.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthorizationInterceptor} from "./interceptors/authorization-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    ArticlePageComponent,
    NavbarComponent,
    LocationPageComponent,
    ArticleLocationPageComponent,
    ArticleLocationHistoryPageComponent,
    PrintArticleLocationsComponent,
    LoginComponent,
    RegisterComponent
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
    ReactiveFormsModule,
    OverlayPanelModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HttpErrorInterceptor,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthorizationInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
