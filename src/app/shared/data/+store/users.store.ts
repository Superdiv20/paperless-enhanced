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
import { User } from '@shared/data/models/user';
import { UserService } from '@shared/data/services/user-service';

export interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const UsersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withRequestStatus(),
  withMethods((store, userService = inject(UserService)) => ({
    async loadAllUsers(): Promise<void> {
      patchState(store, setPending());
      try {
        const result = await userService.getAllUsers();
        patchState(store, { users: result.results, ...setFulfilled() });
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Failed to load users';
        patchState(store, setError(message));
      }
    },
  })),
);
