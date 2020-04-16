import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatTabsModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExerciseModule } from './exercise/exercise.module';
import { RaspberryPiModule } from './raspberry-pi/raspberry-pi.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { PortfolioModule } from './hq/portfolio/portfolio.module';
import { HqstatModule } from './hq/hqstat/hqstat.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,

    ExerciseModule,
    RaspberryPiModule,
    BookmarksModule,
    PortfolioModule,
    HqstatModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
