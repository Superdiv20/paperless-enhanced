import {
  DestroyRef,
  DOCUMENT,
  effect,
  inject,
  Injectable,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { AppSettingsStore } from '@shared/data/+store/app-settings.store';
import {
  APP_SETTINGS_KEYS,
  PAPERLESS_GREEN_HEX,
} from '@shared/data/models/app-settings';
import { AppSettingsKey } from '@shared/data/services/app-settings-service';
import { parseBoolean } from '@shared/utils/parse-boolean';

@Injectable({
  providedIn: 'root',
})
export class AppearanceSettingsService {
  private static readonly THEME_MODE_STORAGE_KEY = 'paperless:theme-mode';

  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly destroyRef = inject(DestroyRef);
  private readonly appSettingsStore = inject(AppSettingsStore);

  private readonly darkModeMediaQuery =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null;

  constructor() {
    if (this.darkModeMediaQuery) {
      const listener = () => this.applyAppearanceSettings();
      this.darkModeMediaQuery.addEventListener('change', listener);
      this.destroyRef.onDestroy(() => {
        this.darkModeMediaQuery?.removeEventListener('change', listener);
      });
    }

    effect(() => {
      this.appSettingsStore.resolved();
      this.applyAppearanceSettings();
    });
  }

  applyAppearanceSettings(): void {
    this.applyDarkMode();
    this.applyThemeColor();
    this.applyAppTitle();
  }

  private applyDarkMode(): void {
    // Avoid applying fallback defaults before settings are loaded.
    if (!this.appSettingsStore.snapshot()) {
      return;
    }

    const useSystem = this.readBooleanSetting(
      APP_SETTINGS_KEYS.DARK_MODE_USE_SYSTEM,
      false,
    );

    const enabled = this.readBooleanSetting(
      APP_SETTINGS_KEYS.DARK_MODE_ENABLED,
      false,
    );

    const prefersDark = this.darkModeMediaQuery?.matches ?? false;
    const isDark = useSystem ? prefersDark : enabled;
    const mode = useSystem ? 'system' : enabled ? 'dark' : 'light';

    this.persistThemeMode(mode);

    this.document.documentElement.classList.toggle('dark', isDark);
    this.document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  }

  private readBooleanSetting(key: AppSettingsKey, fallback: boolean): boolean {
    const value = this.appSettingsStore.getSetting(key);
    return parseBoolean(value, fallback);
  }

  private persistThemeMode(mode: 'light' | 'dark' | 'system'): void {
    try {
      localStorage.setItem(AppearanceSettingsService.THEME_MODE_STORAGE_KEY, mode);
    } catch {
      // Ignore localStorage write failures (e.g., private mode restrictions).
    }
  }

  private applyThemeColor(): void {
    const colorSetting = this.appSettingsStore.getSetting(
      APP_SETTINGS_KEYS.THEME_COLOR,
    );
    const themeColor =
      typeof colorSetting === 'string' && colorSetting.trim().length > 0
        ? colorSetting.trim()
        : null;

    if (themeColor) {
      this.document.documentElement.style.setProperty('--primary', themeColor);
    } else {
      this.document.documentElement.style.removeProperty('--primary');
    }

    this.meta.updateTag({
      name: 'theme-color',
      content: themeColor ?? PAPERLESS_GREEN_HEX,
    });
  }

  private applyAppTitle(): void {
    const appTitleSetting = this.appSettingsStore.getSetting(
      APP_SETTINGS_KEYS.APP_TITLE,
    );
    const appTitle =
      typeof appTitleSetting === 'string' && appTitleSetting.trim().length > 0
        ? appTitleSetting.trim()
        : 'paperless-enhanced';

    this.document.title = appTitle;
  }
}
