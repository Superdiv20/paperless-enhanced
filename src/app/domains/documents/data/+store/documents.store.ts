import { computed, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withMethods,
  withHooks,
  withComputed,
  patchState,
} from '@ngrx/signals';
import {
  withRequestStatus,
  setPending,
  setFulfilled,
  setError,
} from '@shared/utils/with-request-status';
import { DocumentService } from '../services/document-service';
import { Document, ResolvedDocument } from '../models/document';
import { SearchResult } from '@shared/data/models/search-result';
import { DisplayMode } from '../models/display-mode';
import { withLocalStorage } from '@shared/utils/with-local-storage';
import {
  DEFAULT_DISPLAY_FIELDS,
  DisplayField,
  SortField,
} from '../models/document-display';
import { FilterRule } from '@shared/data/models/filter-rule';
import {
  FILTER_HAS_TAGS_ALL,
  FILTER_HAS_TAGS_ANY,
  FILTER_HAS_CORRESPONDENT_ANY,
  FILTER_DOES_NOT_HAVE_CORRESPONDENT,
  FILTER_HAS_DOCUMENT_TYPE_ANY,
  FILTER_DOES_NOT_HAVE_DOCUMENT_TYPE,
  FILTER_HAS_STORAGE_PATH_ANY,
  FILTER_DOES_NOT_HAVE_STORAGE_PATH,
  FILTER_CREATED_FROM,
  FILTER_CREATED_TO,
  FILTER_ADDED_FROM,
  FILTER_ADDED_TO,
  FILTER_OWNER_ANY,
  FILTER_OWNER_DOES_NOT_INCLUDE,
  FILTER_OWNER_ISNULL,
} from '@shared/data/models/filter-rule-type';
import { TagsStore } from '@shared/data/+store/tags.store';
import { CorrespondentsStore } from '@shared/data/+store/correspondents.store';
import { DocumentTypesStore } from '@shared/data/+store/document-types.store';
import { StoragePathsStore } from '@shared/data/+store/storage-paths.store';
import { UsersStore } from '@shared/data/+store/users.store';
import {
  DatePreset,
  DocumentFilters,
  dateRangeForPreset,
  initialDocumentFilters,
} from '../models/document-filters';
import { AppSettingsStore } from '@shared/data/+store/app-settings.store';
import { canViewDisplayField } from '../utils/display-field-permissions';

export interface DocumentsState {
  documents: Document[];
  displayMode: DisplayMode;
  displayFields: typeof DEFAULT_DISPLAY_FIELDS;
  sortField: SortField | null;
  documentFilters: DocumentFilters;
}

const initialState: DocumentsState = {
  documents: [],
  displayMode: DisplayMode.TABLE,
  displayFields: DEFAULT_DISPLAY_FIELDS,
  sortField: null,
  documentFilters: initialDocumentFilters,
};

function deriveFilterRules(f: DocumentFilters): FilterRule[] {
  const rules: FilterRule[] = [];

  const tagRuleType =
    f.tags.mode === 'all' ? FILTER_HAS_TAGS_ALL : FILTER_HAS_TAGS_ANY;
  for (const id of f.tags.ids) {
    rules.push({ rule_type: tagRuleType, value: String(id) });
  }

  const corrRuleType =
    f.correspondents.mode === 'include'
      ? FILTER_HAS_CORRESPONDENT_ANY
      : FILTER_DOES_NOT_HAVE_CORRESPONDENT;
  for (const id of f.correspondents.ids) {
    rules.push({ rule_type: corrRuleType, value: String(id) });
  }

  const dtRuleType =
    f.documentTypes.mode === 'include'
      ? FILTER_HAS_DOCUMENT_TYPE_ANY
      : FILTER_DOES_NOT_HAVE_DOCUMENT_TYPE;
  for (const id of f.documentTypes.ids) {
    rules.push({ rule_type: dtRuleType, value: String(id) });
  }

  const spRuleType =
    f.storagePaths.mode === 'include'
      ? FILTER_HAS_STORAGE_PATH_ANY
      : FILTER_DOES_NOT_HAVE_STORAGE_PATH;
  for (const id of f.storagePaths.ids) {
    rules.push({ rule_type: spRuleType, value: String(id) });
  }

  if (f.createdDate.from && f.createdDate.to) {
    rules.push({ rule_type: FILTER_CREATED_FROM, value: f.createdDate.from });
    rules.push({ rule_type: FILTER_CREATED_TO, value: f.createdDate.to });
  }

  if (f.addedDate.from && f.addedDate.to) {
    rules.push({ rule_type: FILTER_ADDED_FROM, value: f.addedDate.from });
    rules.push({ rule_type: FILTER_ADDED_TO, value: f.addedDate.to });
  }

  if (f.owner.ids.length > 0) {
    const ownerRuleType =
      f.owner.mode === 'include'
        ? FILTER_OWNER_ANY
        : FILTER_OWNER_DOES_NOT_INCLUDE;
    for (const id of f.owner.ids) {
      rules.push({ rule_type: ownerRuleType, value: String(id) });
    }
  }

  if (f.owner.includeUnowned) {
    rules.push({ rule_type: FILTER_OWNER_ISNULL, value: 'true' });
  }

  return rules;
}

export const DocumentsStore = signalStore(
  withState(initialState),
  withRequestStatus(),
  withLocalStorage('paperless:documents-v2', [
    'displayMode',
    'displayFields',
    'sortField',
    'documentFilters',
  ]),
  withComputed((store) => {
    const tagsStore = inject(TagsStore);
    const correspondentsStore = inject(CorrespondentsStore);
    const documentTypesStore = inject(DocumentTypesStore);
    const storagePathsStore = inject(StoragePathsStore);
    const usersStore = inject(UsersStore);
    const appSettingsStore = inject(AppSettingsStore);

    const availableDisplayFields = computed(() => {
      const notesEnabled = appSettingsStore.notesEnabled();
      const permissions = appSettingsStore.permissions();
      const isSuperuser = appSettingsStore.isSuperuser();

      return DEFAULT_DISPLAY_FIELDS.filter(
        (field) =>
          (notesEnabled || field.id !== DisplayField.NOTES) &&
          canViewDisplayField(field.id, permissions, isSuperuser),
      );
    });

    const visibleDisplayFields = computed(() => {
      const availableIds = new Set(
        availableDisplayFields().map((field) => field.id),
      );
      return store
        .displayFields()
        .filter((field) => availableIds.has(field.id));
    });

    return {
      availableDisplayFields,
      visibleDisplayFields,

      filterRules: computed<FilterRule[]>(() =>
        deriveFilterRules(store.documentFilters()),
      ),

      selectedTags: computed(() => {
        const ids = store.documentFilters().tags.ids;
        return tagsStore.tags().filter((t) => ids.includes(t.id!));
      }),
      selectedCorrespondents: computed(() => {
        const ids = store.documentFilters().correspondents.ids;
        return correspondentsStore
          .correspondents()
          .filter((c) => ids.includes(c.id!));
      }),
      selectedDocumentTypes: computed(() => {
        const ids = store.documentFilters().documentTypes.ids;
        return documentTypesStore
          .documentTypes()
          .filter((dt) => ids.includes(dt.id!));
      }),
      selectedStoragePaths: computed(() => {
        const ids = store.documentFilters().storagePaths.ids;
        return storagePathsStore
          .storagePaths()
          .filter((sp) => ids.includes(sp.id!));
      }),

      selectedOwners: computed(() => {
        const ids = store.documentFilters().owner.ids;
        return usersStore.users().filter((u) => ids.includes(u.id!));
      }),

      resolvedDocuments: computed<ResolvedDocument[]>(() => {
        const tags = tagsStore.tags();
        const correspondents = correspondentsStore.correspondents();
        const documentTypes = documentTypesStore.documentTypes();
        const storagePaths = storagePathsStore.storagePaths();
        return store.documents().map((doc) => ({
          ...doc,
          correspondent: correspondents.find((c) => c.id === doc.correspondent),
          document_type: documentTypes.find(
            (dt) => dt.id === doc.document_type,
          ),
          storage_path: storagePaths.find((sp) => sp.id === doc.storage_path),
          tags: doc.tags
            ?.map((id) => tags.find((t) => t.id === id))
            .filter((t) => t !== undefined),
        }));
      }),
    };
  }),
  withMethods((store, documentService = inject(DocumentService)) => ({
    setDisplayMode(mode: DisplayMode) {
      patchState(store, { displayMode: mode });
    },

    toggleDisplayField(fieldId: DisplayField) {
      const available = store.availableDisplayFields();
      if (!available.some((field) => field.id === fieldId)) {
        return;
      }

      const current = store.displayFields();
      const exists = current.some((f) => f.id === fieldId);
      patchState(store, {
        displayFields: exists
          ? current.filter((f) => f.id !== fieldId)
          : [...current, available.find((f) => f.id === fieldId)!],
      });
    },

    setSortField(field: { field: string; name: string }) {
      patchState(store, { sortField: field });
      this.loadDocuments(deriveFilterRules(store.documentFilters()), {
        ordering: field.field,
      });
    },

    patchFilters(patch: Partial<DocumentFilters>) {
      const updated = { ...store.documentFilters(), ...patch };
      patchState(store, { documentFilters: updated });
      const sortField = store.sortField();
      this.loadDocuments(
        deriveFilterRules(updated),
        sortField ? { ordering: sortField.field } : {},
      );
    },

    setTagFilter(ids: number[]) {
      this.patchFilters({ tags: { ...store.documentFilters().tags, ids } });
    },

    setTagMode(mode: 'all' | 'any') {
      const current = store.documentFilters().tags;
      this.patchFilters({ tags: { ...current, mode } });
    },

    setCorrespondentFilter(ids: number[]) {
      this.patchFilters({
        correspondents: { ...store.documentFilters().correspondents, ids },
      });
    },

    setCorrespondentMode(mode: 'include' | 'exclude') {
      const current = store.documentFilters().correspondents;
      this.patchFilters({ correspondents: { ...current, mode } });
    },

    setDocumentTypeFilter(ids: number[]) {
      this.patchFilters({
        documentTypes: { ...store.documentFilters().documentTypes, ids },
      });
    },

    setDocumentTypeMode(mode: 'include' | 'exclude') {
      const current = store.documentFilters().documentTypes;
      this.patchFilters({ documentTypes: { ...current, mode } });
    },

    setStoragePathFilter(ids: number[]) {
      this.patchFilters({
        storagePaths: { ...store.documentFilters().storagePaths, ids },
      });
    },

    setStoragePathMode(mode: 'include' | 'exclude') {
      const current = store.documentFilters().storagePaths;
      this.patchFilters({ storagePaths: { ...current, mode } });
    },

    setOwnerFilter(ids: number[]) {
      this.patchFilters({
        owner: { ...store.documentFilters().owner, ids },
      });
    },

    setOwnerMode(mode: 'include' | 'exclude') {
      this.patchFilters({
        owner: { ...store.documentFilters().owner, mode },
      });
    },

    setOwnerIncludeUnowned(includeUnowned: boolean) {
      this.patchFilters({
        owner: { ...store.documentFilters().owner, includeUnowned },
      });
    },

    setDateFilter(field: 'created' | 'added', preset: DatePreset) {
      const key = field === 'created' ? 'createdDate' : 'addedDate';
      const range = dateRangeForPreset(preset);
      this.patchFilters({ [key]: { preset, ...range } });
    },

    setCustomDateFilter(field: 'created' | 'added', from: string, to: string) {
      const key = field === 'created' ? 'createdDate' : 'addedDate';
      this.patchFilters({ [key]: { preset: null, from, to } });
    },

    clearDateFilter(field: 'created' | 'added') {
      const key = field === 'created' ? 'createdDate' : 'addedDate';
      this.patchFilters({ [key]: { preset: null, from: null, to: null } });
    },

    clearAllFilters() {
      this.patchFilters(initialDocumentFilters);
    },

    async loadDocuments(
      rules: FilterRule[] = deriveFilterRules(store.documentFilters()),
      params: { ordering?: string } = {},
    ) {
      patchState(store, setPending());
      try {
        const result: SearchResult<Document> =
          await documentService.getDocuments(rules, params);
        patchState(store, { documents: result.results, ...setFulfilled() });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Failed to load documents';
        patchState(store, setError(message));
      }
    },
  })),

  withHooks({
    onInit(store) {
      inject(TagsStore).loadAllTags();
      inject(CorrespondentsStore).loadAllCorrespondents();
      inject(DocumentTypesStore).loadAllDocumentTypes();
      inject(StoragePathsStore).loadAllStoragePaths();
      inject(UsersStore).loadAllUsers();
      const sortField = store.sortField();
      store.loadDocuments(
        deriveFilterRules(store.documentFilters()),
        sortField ? { ordering: sortField.field } : {},
      );
    },
  }),
);
