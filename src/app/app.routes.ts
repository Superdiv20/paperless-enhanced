import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'administration',
    loadComponent: () =>
      import('./domains/administration-overview/administration-overview').then(
        (m) => m.AdministrationOverview,
      ),
  },
];
