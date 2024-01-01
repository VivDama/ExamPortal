import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './app/services/auth.interceptor';
import { loggerInterceptor } from './app/services/logger.interceptor';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  // export const appConfig: ApplicationConfig = {
  //   providers: [
  //     provideHttpClient(withInterceptors([loggerInterceptor]))
  //   ],
  // };
