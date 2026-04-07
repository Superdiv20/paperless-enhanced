import { effect } from '@angular/core';
import { patchState, signalStoreFeature, withHooks } from '@ngrx/signals';
import { toast } from 'ngx-sonner';

/**
 * A reusable SignalStore feature that hydrates a slice of state from
 * localStorage on init and persists it back whenever it changes.
 *
 * @param storageKey  The localStorage key to read/write.
 * @param fields      The state property names to persist.
 *
 * @example
 * withLocalStorage('paperless:documents', ['displayMode'])
 */
export function withLocalStorage(storageKey: string, fields: string[]) {
  return signalStoreFeature(
    withHooks({
      onInit(store: Record<string, unknown>) {
        try {
          const raw = localStorage.getItem(storageKey);
          if (raw) {
            const parsed = JSON.parse(raw) as Record<string, unknown>;
            const safe = Object.fromEntries(
              fields.filter((f) => f in parsed).map((f) => [f, parsed[f]]),
            );
            if (Object.keys(safe).length) {
              patchState(store as Parameters<typeof patchState>[0], safe);
            }
          }
        } catch (e: Error | unknown) {
          toast.error(
            `Failed to load persisted settings: ${
              e instanceof Error ? e.message : String(e)
            }`,
          );
        }

        effect(() => {
          const slice: Record<string, unknown> = {};
          for (const field of fields) {
            const sig = store[field];
            slice[field] =
              typeof sig === 'function' ? (sig as () => unknown)() : sig;
          }
          try {
            localStorage.setItem(storageKey, JSON.stringify(slice));
          } catch (e: Error | unknown) {
            toast.error(
              `Failed to persist settings: ${
                e instanceof Error ? e.message : String(e)
              }`,
            );
          }
        });
      },
    }),
  );
}
