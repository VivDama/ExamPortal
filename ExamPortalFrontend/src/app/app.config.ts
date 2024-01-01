import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors,} from '@angular/common/http';
import { loggerInterceptor } from './services/logger.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(),provideHttpClient(withInterceptors([loggerInterceptor])),]
};
