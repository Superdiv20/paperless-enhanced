import {
  ApplicationConfig,
  APP_INITIALIZER,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  LOCALE_ID,
  provideAppInitializer,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { basicAuthInterceptor } from './core/interceptors/basic-auth.interceptor';
import { AppearanceSettingsService } from '@shared/data/services/appearance-settings.service';
import { LocalizationSettingsService } from '@shared/data/services/localization-settings.service';

function initializeAppearanceSettings() {
  inject(AppearanceSettingsService);
}

function initializeLocalizationSettings() {
  inject(LocalizationSettingsService);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([basicAuthInterceptor])),
    provideAppInitializer(initializeAppearanceSettings),
    provideAppInitializer(initializeLocalizationSettings),
    { provide: LOCALE_ID, useValue: 'en-US' },
  ],
};
