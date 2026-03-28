import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '@shared/utils/with-request-status';
import { DocumentType } from '@shared/data/models/document-type';
import { DocumentTypeService } from '@shared/data/services/document-type-service';

export interface DocumentTypesState {
  documentTypes: DocumentType[];
}

const initialState: DocumentTypesState = {
  documentTypes: [],
};

export const DocumentTypesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withRequestStatus(),
  withMethods((store, documentTypeService = inject(DocumentTypeService)) => ({
    async loadAllDocumentTypes(): Promise<void> {
      patchState(store, setPending());
      try {
        const result = await documentTypeService.getAllDocumentTypes();
        patchState(store, {
          documentTypes: result.results,
          ...setFulfilled(),
        });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Failed to load document types';
        patchState(store, setError(message));
      }
    },
  })),
);
