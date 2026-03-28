import { Injectable, inject } from '@angular/core';
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
import { Tag } from '@shared/data/models/tag';
import { TagService } from '@shared/data/services/tag-service';

export interface TagsState {
  tags: Tag[];
}

const initialState: TagsState = {
  tags: [],
};

export const TagsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withRequestStatus(),
  withMethods((store, tagService = inject(TagService)) => ({
    async loadAllTags(): Promise<void> {
      patchState(store, setPending());
      try {
        const result = await tagService.getAllTags();
        patchState(store, { tags: result.results, ...setFulfilled() });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Failed to load tags';
        patchState(store, setError(message));
      }
    },
  })),
);
