import { Injectable, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withMethods,
  withHooks,
  patchState,
} from '@ngrx/signals';
import {
  withRequestStatus,
  setPending,
  setFulfilled,
  setError,
} from '@shared/utils/with-request-status';
import { DocumentService } from '../services/document-service';
import { Document } from '../models/document';
import { SearchResult } from '@shared/data/models/search-result';
import { DisplayMode } from '../models/display-mode';
import { withLocalStorage } from '@shared/utils/with-local-storage';
import {
  DEFAULT_DISPLAY_FIELDS,
  DisplayField,
  SortField,
} from '../models/document-display';
import { FilterRule } from '@shared/data/models/filter-rule';
import { TagsStore } from '@shared/data/+store/tags.store';
import { CorrespondentsStore } from '@shared/data/+store/correspondents.store';
import { DocumentTypesStore } from '@shared/data/+store/document-types.store';

export interface DocumentsState {
  documents: Document[];
  displayMode: DisplayMode;
  displayFields: typeof DEFAULT_DISPLAY_FIELDS;
  sortField: SortField | null; // sorting happens on the backend
  filters: FilterRule[];
}

const initialState: DocumentsState = {
  documents: [],
  displayMode: DisplayMode.TABLE,
  displayFields: DEFAULT_DISPLAY_FIELDS, // Default to showing all fields
  sortField: null, // No sorting by default
  filters: [], // No filters by default
};

export const DocumentsStore = signalStore(
  withState(initialState),
  withRequestStatus(),
  withLocalStorage('paperless:documents', [
    'displayMode',
    'displayFields',
    'sortField',
  ]),
  withMethods((store, documentService = inject(DocumentService)) => ({
    async loadDocuments(
      filters: FilterRule[] = store.filters(),
      params: { ordering?: string } = {},
    ) {
      patchState(store, setPending());

      try {
        const result: SearchResult<Document> =
          await documentService.getDocuments(filters, params);
        patchState(store, {
          documents: result.results,
          ...setFulfilled(),
        });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Failed to load documents';
        patchState(store, setError(message));
      }
    },
    setDisplayMode(mode: DisplayMode) {
      patchState(store, { displayMode: mode });
    },
    toggleDisplayField(fieldId: DisplayField) {
      const current = store.displayFields();
      const exists = current.some((f) => f.id === fieldId);
      patchState(store, {
        displayFields: exists
          ? current.filter((f) => f.id !== fieldId)
          : [...current, DEFAULT_DISPLAY_FIELDS.find((f) => f.id === fieldId)!],
      });
    },
    setSortField(field: { field: string; name: string }) {
      patchState(store, { sortField: field });
      this.loadDocuments(store.filters(), { ordering: field.field });
    },
    setFilters(filters: FilterRule[]) {
      patchState(store, { filters });
      const sortField = store.sortField();
      this.loadDocuments(
        filters,
        sortField ? { ordering: sortField.field } : {},
      );
    },
  })),

  withHooks({
    onInit(store) {
      const tagsStore = inject(TagsStore);
      const correspondentsStore = inject(CorrespondentsStore);
      inject(DocumentTypesStore).loadAllDocumentTypes();
      const sortField = store.sortField();
      tagsStore.loadAllTags();
      correspondentsStore.loadAllCorrespondents();
      store.loadDocuments(
        store.filters(),
        sortField ? { ordering: sortField.field } : {},
      );
    },
  }),
);
