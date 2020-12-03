import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './config.service';

export function initApp(configService: ConfigService) {
  return () => configService.load();
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [ConfigService],
      multi: true,
    },
  ],
})
export class AppConfigModule { }
