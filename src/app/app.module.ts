import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatTabsModule, MatToolbarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExerciseModule } from './exercise/exercise.module';
import { RaspberryPiModule } from './raspberry-pi/raspberry-pi.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { PortfolioModule } from './hq/portfolio/portfolio.module';
import { HqhistoryModule } from './hq/hqhistory/hqhistory.module';
import { HqhlModule } from './hq/hqhl/hqhl.module';
import { LedgerModule } from './hq/ledger/ledger.module';
import { DatePipe } from '@angular/common';

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
    MatToolbarModule,

    ExerciseModule,
    RaspberryPiModule,
    BookmarksModule,
    PortfolioModule,
    HqhistoryModule,
    HqhlModule,
    LedgerModule,
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
