import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/components/common/messageservice';
import { GrowlModule } from 'primeng/primeng';
import {MenubarModule} from 'primeng/menubar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';

import { AppComponent } from './app.component';
import { StatsService } from './stats.service';
import { AppRoutingModule } from './/app-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RoundsComponent } from './rounds/rounds.component';
import { GolfersComponent } from './golfers/golfers.component';
import { CoursesComponent } from './courses/courses.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    RoundsComponent,
    GolfersComponent,
    CoursesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GrowlModule,
    AppRoutingModule,
    MenubarModule,
    RadioButtonModule,
    FormsModule,
    ButtonModule
  ],
  providers: [
    StatsService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
