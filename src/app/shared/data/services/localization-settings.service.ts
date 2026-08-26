import {
  effect,
  inject,
  Injectable,
  LOCALE_ID,
  DOCUMENT,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { AppSettingsStore } from '@shared/data/+store/app-settings.store';
import {
  APP_SETTINGS_KEYS,
} from '@shared/data/models/app-settings';
import {
  ISO_LANGUAGE_OPTION,
  LANGUAGE_OPTIONS,
  LanguageOption,
} from '@shared/data/models/language-options';
import { AppSettingsKey } from '@shared/data/services/app-settings-service';

const LANGUAGE_COOKIE_NAME = 'django_language';

@Injectable({
  providedIn: 'root',
})
export class LocalizationSettingsService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly appSettingsStore = inject(AppSettingsStore);
  private readonly localeId = inject(LOCALE_ID);

  constructor() {
    effect(() => {
      this.appSettingsStore.resolved();
      this.applyLocalizationSettings();
    });
  }

  applyLocalizationSettings(): void {
    if (!this.appSettingsStore.snapshot()) {
      return;
    }

    const language = this.getNormalizedLanguage();
    this.applyLanguage(language);
    this.applyDateLocale(language);
    this.applyDocumentLanguage(language);
  }

  getLanguageOptions(): LanguageOption[] {
    return [...LANGUAGE_OPTIONS].sort((a, b) => (a.name < b.name ? -1 : 1));
  }

  getDateLocaleOptions(): LanguageOption[] {
    return [ISO_LANGUAGE_OPTION, ...this.getLanguageOptions()];
  }

  getLocalizedDateInputFormat(): string {
    const dateLocaleSetting = this.readSetting(APP_SETTINGS_KEYS.DATE_LOCALE);
    const language = this.getNormalizedLanguage();
    const locale =
      dateLocaleSetting || language || this.localeId.toLowerCase();

    return (
      this.getDateLocaleOptions().find((option) => option.code === locale)
        ?.dateInputFormat || 'yyyy-mm-dd'
    );
  }

  private applyLanguage(language: string): void {
    this.writeLanguageCookie(language);

    if (language.length > 0) {
      this.meta.updateTag({ name: 'content-language', content: language });
    }
  }

  private applyDateLocale(language: string): void {
    const dateLocale = this.readSetting(APP_SETTINGS_KEYS.DATE_LOCALE);
    const locale = dateLocale || language || this.localeId.toLowerCase();
    this.document.documentElement.setAttribute('data-date-locale', locale);
  }

  private applyDocumentLanguage(language: string): void {
    const lang = language || this.localeId.toLowerCase();
    this.document.documentElement.lang = lang;
  }

  private getNormalizedLanguage(): string {
    const language = this.readSetting(APP_SETTINGS_KEYS.LANGUAGE);
    return language.trim().toLowerCase();
  }

  private writeLanguageCookie(language: string): void {
    const cookieValue = language || '';
    const prefix = this.getCookiePrefix();
    const cookieName = `${prefix}${LANGUAGE_COOKIE_NAME}`;
    const cookie = `${cookieName}=${encodeURIComponent(cookieValue)}; path=/`;

    try {
      this.document.cookie = cookie;
    } catch {
      // Ignore cookie write failures.
    }
  }

  private getCookiePrefix(): string {
    const metaTag = this.meta.getTag('name=cookie_prefix');
    if (!metaTag?.content) {
      return '';
    }

    return metaTag.content;
  }

  private readSetting(key: AppSettingsKey): string {
    const value = this.appSettingsStore.getSetting(key);
    return typeof value === 'string' ? value.trim().toLowerCase() : '';
  }
}