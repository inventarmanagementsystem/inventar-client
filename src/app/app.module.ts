import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ArticlePageComponent} from "./articles/article-page/article-page.component";
import {HttpClientModule} from "@angular/common/http";
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

@NgModule({
  declarations: [
    AppComponent,
    ArticlePageComponent
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
