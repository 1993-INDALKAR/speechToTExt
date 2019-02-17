import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActualLoginComponent } from './components/actual-login/actual-login.component';
import { AudioConvertorComponent } from './components/audio-convertor/audio-convertor.component';
import { AddColleaguesComponent } from './components/add-colleagues/add-colleagues.component';

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "signup", component: LoginComponent },
  { path: "login", component: ActualLoginComponent },
  { path: "addColleagues", component: AddColleaguesComponent },
  { path: "audioConv", component: AudioConvertorComponent },
  {
    path: 'not-found', component: PageNotFoundComponent
  }
  // {
  //   path: '**', redirectTo: 'not-found', pathMatch: 'full'
  // }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    ActualLoginComponent,
    AudioConvertorComponent,
    AddColleaguesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
