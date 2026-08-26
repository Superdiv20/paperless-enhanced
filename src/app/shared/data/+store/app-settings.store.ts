import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '@shared/utils/with-request-status';
import {
  APP_SETTINGS,
  APP_SETTINGS_KEYS,
  AppSettingCategory,
  AppSettings,
  GlobalSearchType,
} from '@shared/data/models/app-settings';
import {
  AppSettingsKey,
  AppSettingsService,
  CategorySetting,
} from '@shared/data/services/app-settings-service';
import { parseBoolean } from '@shared/utils/parse-boolean';

export interface AppSettingsState {
  snapshot: AppSettings | null;
  resolved: Record<string, unknown>;
}

const initialState: AppSettingsState = {
  snapshot: null,
  resolved: {},
};

function parseString(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim().length > 0
    ? value.trim()
    : fallback;
}

function parseNumber(value: unknown, fallback: number): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }
  return fallback;
}

export const AppSettingsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withRequestStatus(),
  withComputed(({ resolved, snapshot }) => ({
    currentUser: computed(() => snapshot()?.user ?? null),
    permissions: computed(() => snapshot()?.permissions ?? []),
    isSuperuser: computed(() => !!snapshot()?.user?.is_superuser),

    allSettings: computed(() =>
      APP_SETTINGS.map((definition) => ({
        definition,
        value: resolved()[definition.key],
      })),
    ),
    byCategory: computed(() => {
      const values = resolved();
      const grouped: Record<AppSettingCategory, CategorySetting[]> = {
        system: [],
        ui: [],
        document: [],
        notifications: [],
        'saved-views': [],
        permissions: [],
        integration: [],
        features: [],
      };
      for (const definition of APP_SETTINGS) {
        grouped[definition.category].push({
          definition,
          value: values[definition.key],
        });
      }
      return grouped;
    }),

    // Features
    notesEnabled: computed(() =>
      parseBoolean(resolved()[APP_SETTINGS_KEYS.NOTES_ENABLED], true),
    ),

    // Saved views
    sidebarViewsShowCount: computed(() =>
      parseBoolean(resolved()[APP_SETTINGS_KEYS.SIDEBAR_VIEWS_SHOW_COUNT], true),
    ),
    warnOnUnsavedChange: computed(() =>
      parseBoolean(
        resolved()[APP_SETTINGS_KEYS.SAVED_VIEWS_WARN_ON_UNSAVED_CHANGE],
        true,
      ),
    ),

    // Bulk edit
    bulkEditApplyOnClose: computed(() =>
      parseBoolean(resolved()[APP_SETTINGS_KEYS.BULK_EDIT_APPLY_ON_CLOSE], false),
    ),
    bulkEditConfirmationDialogs: computed(() =>
      parseBoolean(
        resolved()[APP_SETTINGS_KEYS.BULK_EDIT_CONFIRMATION_DIALOGS],
        true,
      ),
    ),

    // Search
    searchDbOnly: computed(() =>
      parseBoolean(resolved()[APP_SETTINGS_KEYS.SEARCH_DB_ONLY], false),
    ),
    searchMoreLink: computed(() =>
      parseString(
        resolved()[APP_SETTINGS_KEYS.SEARCH_FULL_TYPE],
        GlobalSearchType.TITLE_CONTENT,
      ),
    ),

    // Update checking
    updateCheckingEnabled: computed(() =>
      parseBoolean(resolved()[APP_SETTINGS_KEYS.UPDATE_CHECKING_ENABLED], false),
    ),
    updateCheckingBackendSetting: computed(() =>
      parseString(
        resolved()[APP_SETTINGS_KEYS.UPDATE_CHECKING_BACKEND_SETTING],
        'default',
      ),
    ),

    // Document settings
    documentListSize: computed(() =>
      parseNumber(resolved()[APP_SETTINGS_KEYS.DOCUMENT_LIST_SIZE], 50),
    ),
    useNativePdfViewer: computed(() =>
      parseBoolean(resolved()[APP_SETTINGS_KEYS.USE_NATIVE_PDF_VIEWER], false),
    ),
    pdfViewerZoomSetting: computed(() =>
      parseString(resolved()[APP_SETTINGS_KEYS.PDF_VIEWER_ZOOM_SETTING], 'page-width'),
    ),
    documentEditingOverlayThumbnail: computed(() =>
      parseBoolean(
        resolved()[APP_SETTINGS_KEYS.DOCUMENT_EDITING_OVERLAY_THUMBNAIL],
        true,
      ),
    ),
    documentEditingRemoveInboxTags: computed(() =>
      parseBoolean(
        resolved()[APP_SETTINGS_KEYS.DOCUMENT_EDITING_REMOVE_INBOX_TAGS],
        false,
      ),
    ),
  })),
  withMethods((store, appSettingsService = inject(AppSettingsService)) => ({
    async load(force = false): Promise<void> {
      patchState(store, setPending());
      try {
        const snapshot = await appSettingsService.fetch(force);
        patchState(store, {
          snapshot,
          resolved: appSettingsService.getAllResolved(),
          ...setFulfilled(),
        });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Failed to load app settings';
        patchState(store, setError(message));
      }
    },

    getSetting(key: AppSettingsKey): unknown {
      const resolved = store.resolved()[key];
      return resolved !== undefined ? resolved : appSettingsService.getSetting(key);
    },

    getCategory(category: AppSettingCategory): CategorySetting[] {
      return store.byCategory()[category] ?? [];
    },

    setSetting(key: AppSettingsKey, value: unknown): void {
      appSettingsService.setSetting(key, value);
      patchState(store, {
        snapshot: appSettingsService.getSnapshot(),
        resolved: appSettingsService.getAllResolved(),
      });
    },

    setNotesEnabled(enabled: boolean): void {
      appSettingsService.setSetting(APP_SETTINGS_KEYS.NOTES_ENABLED, enabled);
      patchState(store, { resolved: appSettingsService.getAllResolved() });
    },
    setWarnOnUnsavedChange(enabled: boolean): void {
      appSettingsService.setSetting(
        APP_SETTINGS_KEYS.SAVED_VIEWS_WARN_ON_UNSAVED_CHANGE,
        enabled,
      );
      patchState(store, { resolved: appSettingsService.getAllResolved() });
    },
    setSidebarViewsShowCount(enabled: boolean): void {
      appSettingsService.setSetting(APP_SETTINGS_KEYS.SIDEBAR_VIEWS_SHOW_COUNT, enabled);
      patchState(store, { resolved: appSettingsService.getAllResolved() });
    },
    setBulkEditApplyOnClose(enabled: boolean): void {
      appSettingsService.setSetting(APP_SETTINGS_KEYS.BULK_EDIT_APPLY_ON_CLOSE, enabled);
      patchState(store, { resolved: appSettingsService.getAllResolved() });
    },
    setBulkEditConfirmationDialogs(enabled: boolean): void {
      appSettingsService.setSetting(
        APP_SETTINGS_KEYS.BULK_EDIT_CONFIRMATION_DIALOGS,
        enabled,
      );
      patchState(store, { resolved: appSettingsService.getAllResolved() });
    },
    setSearchDbOnly(enabled: boolean): void {
      appSettingsService.setSetting(APP_SETTINGS_KEYS.SEARCH_DB_ONLY, enabled);
      patchState(store, { resolved: appSettingsService.getAllResolved() });
    },
    setSearchMoreLink(value: string): void {
      appSettingsService.setSetting(APP_SETTINGS_KEYS.SEARCH_FULL_TYPE, value);
      patchState(store, { resolved: appSettingsService.getAllResolved() });
    },
    setUpdateCheckingEnabled(enabled: boolean): void {
      appSettingsService.setSetting(APP_SETTINGS_KEYS.UPDATE_CHECKING_ENABLED, enabled);
      patchState(store, { resolved: appSettingsService.getAllResolved() });
    },
    setUpdateCheckingBackendSetting(value: string): void {
      appSettingsService.setSetting(
        APP_SETTINGS_KEYS.UPDATE_CHECKING_BACKEND_SETTING,
        value,
      );
      patchState(store, { resolved: appSettingsService.getAllResolved() });
    },
    setDocumentListSize(value: number): void {
      appSettingsService.setSetting(APP_SETTINGS_KEYS.DOCUMENT_LIST_SIZE, value);
      patchState(store, { resolved: appSettingsService.getAllResolved() });
    },
    setUseNativePdfViewer(enabled: boolean): void {
      appSettingsService.setSetting(APP_SETTINGS_KEYS.USE_NATIVE_PDF_VIEWER, enabled);
      patchState(store, { resolved: appSettingsService.getAllResolved() });
    },
    setPdfViewerZoomSetting(value: string): void {
      appSettingsService.setSetting(APP_SETTINGS_KEYS.PDF_VIEWER_ZOOM_SETTING, value);
      patchState(store, { resolved: appSettingsService.getAllResolved() });
    },
    setDocumentEditingOverlayThumbnail(enabled: boolean): void {
      appSettingsService.setSetting(
        APP_SETTINGS_KEYS.DOCUMENT_EDITING_OVERLAY_THUMBNAIL,
        enabled,
      );
      patchState(store, { resolved: appSettingsService.getAllResolved() });
    },
    setDocumentEditingRemoveInboxTags(enabled: boolean): void {
      appSettingsService.setSetting(
        APP_SETTINGS_KEYS.DOCUMENT_EDITING_REMOVE_INBOX_TAGS,
        enabled,
      );
      patchState(store, { resolved: appSettingsService.getAllResolved() });
    },

    async save(): Promise<boolean> {
      patchState(store, setPending());
      try {
        const success = await appSettingsService.save();
        patchState(
          store,
          success ? setFulfilled() : setError('Failed to save app settings'),
        );
        return success;
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Failed to save app settings';
        patchState(store, setError(message));
        return false;
      }
    },
  })),
  withHooks({
    onInit: (store) => {
      store.load();
    },
  }),
);
