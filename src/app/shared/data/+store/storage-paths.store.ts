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
import { StoragePath } from '@shared/data/models/storage-path';
import { StoragePathService } from '@shared/data/services/storage-path-service';

export interface StoragePathsState {
  storagePaths: StoragePath[];
}

const initialState: StoragePathsState = {
  storagePaths: [],
};

export const StoragePathsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withRequestStatus(),
  withMethods((store, storagePathService = inject(StoragePathService)) => ({
    async loadAllStoragePaths(): Promise<void> {
      patchState(store, setPending());
      try {
        const result = await storagePathService.getAllStoragePaths();
        patchState(store, {
          storagePaths: result.results,
          ...setFulfilled(),
        });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Failed to load storage paths';
        patchState(store, setError(message));
      }
    },
  })),
);
