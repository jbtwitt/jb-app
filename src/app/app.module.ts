import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExerciseModule } from './exercise/exercise.module';
import { RaspberryPiModule } from './raspberry-pi/raspberry-pi.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { PortfolioModule } from './hq/portfolio/portfolio.module';
import { HqhistoryModule } from './hq/hqhistory/hqhistory.module';
import { HqhlModule } from './hq/hqhl-module/hqhl.module';
import { LedgerModule } from './hq/ledger/ledger.module';
import { DatePipe } from '@angular/common';
import { UiService } from './services/ui.service';
import { DataService } from './services/data.service';
import { AppConfigModule } from './app-config/app-config.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppConfigModule,

    BrowserAnimationsModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTooltipModule,

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
    // DataService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (u: UiService) => async () => await u.init(),
    //   multi: true,
    //   // useClass: UiService,
    //   deps: [DataService, DatePipe]
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
