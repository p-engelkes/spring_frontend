import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { SidePanel } from './components/side-panel.component';
import { NavBar } from './components/navbar.component';
import { Register } from './components/register.component';

import { RegisterService } from './services/register.service';
import {Login} from "./components/login.component";
import {LoginService} from "./services/login.service";
import {TeamService} from "./services/team.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidePanel,
    NavBar,
    Register,
    Login
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    RegisterService,
    LoginService,
    TeamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
