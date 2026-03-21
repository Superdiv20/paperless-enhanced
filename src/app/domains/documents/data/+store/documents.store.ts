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
import { pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { SearchResult } from '@shared/data/models/search-result';
import { DisplayMode } from '../models/display-mode';
import { withLocalStorage } from '@shared/utils/with-local-storage';
import {
  DEFAULT_DISPLAY_FIELDS,
  DisplayField,
} from '../models/document-display';

export interface DocumentsState {
  documents: Document[];
  displayMode: DisplayMode;
  displayFields: typeof DEFAULT_DISPLAY_FIELDS;
  sortField: { field: string; name: string } | null; // sorting happens on the backend
}

const initialState: DocumentsState = {
  documents: [],
  displayMode: DisplayMode.TABLE,
  displayFields: DEFAULT_DISPLAY_FIELDS, // Default to showing all fields
  sortField: null, // No sorting by default
};

@Injectable({ providedIn: 'root' })
export class DocumentsStore extends signalStore(
  withState(initialState),
  withRequestStatus(),
  withLocalStorage('paperless:documents', [
    'displayMode',
    'displayFields',
    'sortField',
  ]),
  withMethods((store, documentService = inject(DocumentService)) => ({
    loadDocuments: rxMethod<{ ordering?: string } | void>(
      pipe(
        tap(() => patchState(store, setPending())),
        switchMap((params) =>
          documentService.getDocuments(params ?? {}).pipe(
            tapResponse({
              next: (result: SearchResult<Document>) => {
                console.log('Documents loaded:', result);
                patchState(store, {
                  documents: result.results,
                  ...setFulfilled(),
                });
              },
              error: (err: any) => {
                patchState(
                  store,
                  setError(err?.message || 'Failed to load documents'),
                );
              },
            }),
          ),
        ),
      ),
    ),
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
      this.loadDocuments({ ordering: field.field });
    },
  })),

  withHooks({
    onInit(store) {
      const sortField = store.sortField();
      store.loadDocuments(sortField ? { ordering: sortField.field } : undefined);
    },
  }),
) {}
