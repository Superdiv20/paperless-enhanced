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
import { SavedView } from '@shared/data/models/saved-view';
import { SavedViewService } from '@shared/data/services/saved-view-service';

export interface SavedViewsState {
  savedViews: SavedView[];
}

const initialState: SavedViewsState = {
  savedViews: [],
};

export const SavedViewsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withRequestStatus(),
  withComputed(({ savedViews }) => ({
    count: computed(() => savedViews().length),
  })),
  withMethods((store, savedViewService = inject(SavedViewService)) => ({
    async loadAllSavedViews(): Promise<void> {
      patchState(store, setPending());
      try {
        const result = await savedViewService.getAllSavedViews();
        patchState(store, { savedViews: result.results, ...setFulfilled() });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Failed to load saved views';
        patchState(store, setError(message));
      }
    },
  })),
  withHooks({
    onInit(store) {
      store.loadAllSavedViews();
    },
  }),
);
