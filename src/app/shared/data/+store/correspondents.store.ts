import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
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
import { Correspondet } from '@shared/data/models/correspondent';
import { CorrespondentService } from '@shared/data/services/correspondent-service';

export interface CorrespondentsState {
  correspondents: Correspondet[];
}

const initialState: CorrespondentsState = {
  correspondents: [],
};

export const CorrespondentsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withRequestStatus(),
  withMethods((store, correspondentService = inject(CorrespondentService)) => ({
    async loadAllCorrespondents(): Promise<void> {
      patchState(store, setPending());
      try {
        const result = await correspondentService.getAllCorrespondents();
        patchState(store, {
          correspondents: result.results,
          ...setFulfilled(),
        });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Failed to load correspondents';
        patchState(store, setError(message));
      }
    },
  })),
);
