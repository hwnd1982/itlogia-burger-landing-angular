import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PreventDefaultDirective } from "./prevent-default.directive";
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    PreventDefaultDirective,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

