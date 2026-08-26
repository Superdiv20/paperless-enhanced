import { inject, Injectable } from '@angular/core';
import {
  APP_SETTINGS,
  AppSetting,
  AppSettingCategory,
  AppSettings,
  APP_SETTINGS_KEYS,
} from '@shared/data/models/app-settings';
import { AppSettingsRepository } from '@shared/data/services/app-settings-repository';

const UNSAFE_OBJECT_KEYS = new Set(['__proto__', 'prototype', 'constructor']);

export type AppSettingsKey =
  (typeof APP_SETTINGS_KEYS)[keyof typeof APP_SETTINGS_KEYS];

export type CategorySetting = {
  definition: AppSetting;
  value: unknown;
};

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  private readonly repository = inject(AppSettingsRepository);

  private snapshot: AppSettings | null = null;

  async fetch(force = false): Promise<AppSettings> {
    if (this.snapshot && !force) {
      return this.snapshot;
    }

    const fetched = await this.repository.fetch();
    this.snapshot = {
      user: fetched.user,
      permissions: fetched.permissions ?? [],
      settings: this.sanitizeRoot(fetched.settings),
    };

    return this.snapshot;
  }

  getSnapshot(): AppSettings | null {
    return this.snapshot;
  }

  getSetting(key: AppSettingsKey): unknown {
    const definition = this.getDefinition(key);
    if (!definition) {
      return undefined;
    }

    const raw = this.getRawSettingValue(key);

    if (raw === undefined) {
      if (key === APP_SETTINGS_KEYS.DEFAULT_PERMS_OWNER) {
        return this.snapshot?.user?.id ?? definition.default;
      }
      return definition.default;
    }

    return this.coerceValue(definition, raw);
  }

  getByCategory(category: AppSettingCategory): CategorySetting[] {
    return APP_SETTINGS.filter((s) => s.category === category).map(
      (definition) => ({
        definition,
        value: this.getSetting(definition.key as AppSettingsKey),
      }),
    );
  }

  getAllResolved(): Record<string, unknown> {
    const resolved: Record<string, unknown> = {};

    for (const setting of APP_SETTINGS) {
      resolved[setting.key] = this.getSetting(setting.key as AppSettingsKey);
    }

    return resolved;
  }

  setSetting(key: AppSettingsKey, value: unknown): void {
    if (!this.snapshot) {
      this.snapshot = {
        user: {},
        permissions: [],
        settings: {},
      };
    }

    const path = this.parsePath(key);
    if (path.length === 0) {
      return;
    }

    let cursor: Record<string, unknown> = this.snapshot.settings;

    path.forEach((segment, index) => {
      const isLeaf = index === path.length - 1;

      if (isLeaf) {
        cursor[segment] = value;
        return;
      }

      const next = cursor[segment];
      if (!this.isRecord(next)) {
        cursor[segment] = {};
      }

      cursor = cursor[segment] as Record<string, unknown>;
    });
  }

  async save(): Promise<boolean> {
    if (!this.snapshot) {
      return false;
    }

    const result = await this.repository.save(this.snapshot.settings);
    return !!result?.success;
  }

  private getDefinition(key: AppSettingsKey): AppSetting | undefined {
    return APP_SETTINGS.find((s) => s.key === key);
  }

  private getRawSettingValue(key: AppSettingsKey): unknown {
    if (!this.snapshot) {
      return undefined;
    }

    const path = this.parsePath(key);
    if (path.length === 0) {
      return undefined;
    }

    let cursor: unknown = this.snapshot.settings;

    for (const segment of path) {
      if (!this.isRecord(cursor) || !Object.prototype.hasOwnProperty.call(cursor, segment)) {
        return undefined;
      }
      cursor = cursor[segment];
    }

    return cursor;
  }

  private parsePath(key: string): string[] {
    return key
      .replace('general-settings:', '')
      .split(':')
      .map((part) => part.replace(/-/g, '_'))
      .filter((part) => part.length > 0 && this.isSafeObjectKey(part));
  }

  private sanitizeRoot(source: unknown): Record<string, unknown> {
    if (!this.isRecord(source)) {
      return {};
    }

    const result: Record<string, unknown> = {};
    for (const key of Object.keys(source)) {
      if (!this.isSafeObjectKey(key)) {
        continue;
      }
      result[key] = source[key];
    }

    return result;
  }

  private isSafeObjectKey(key: string): boolean {
    return !UNSAFE_OBJECT_KEYS.has(key);
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  private coerceValue(definition: AppSetting, raw: unknown): unknown {
    if (raw === null) {
      return null;
    }

    switch (definition.type) {
      case 'boolean':
        if (typeof raw === 'boolean') {
          return raw;
        }
        if (typeof raw === 'string') {
          if (raw === 'true') {
            return true;
          }
          if (raw === 'false') {
            return false;
          }
        }
        return Boolean(raw);

      case 'number':
        if (typeof raw === 'number') {
          return raw;
        }
        if (typeof raw === 'string' && raw.trim().length > 0) {
          const parsed = Number(raw);
          return Number.isFinite(parsed) ? parsed : definition.default;
        }
        return definition.default;

      case 'string':
        return typeof raw === 'string' ? raw : String(raw);

      case 'array':
        return Array.isArray(raw) ? raw : definition.default;

      case 'object':
        return this.isRecord(raw) ? raw : definition.default;

      default:
        return raw;
    }
  }
}
