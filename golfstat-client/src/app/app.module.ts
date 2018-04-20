import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/components/common/messageservice';
import { GrowlModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { StatsService } from './stats.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GrowlModule
  ],
  providers: [
    StatsService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
