import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  Display,
  NumButton,
  CallButton,
  BackButton,
} from './parts/parts.module';

@NgModule({
  declarations: [
    AppComponent,
    Display,
    NumButton,
    CallButton,
    BackButton,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
