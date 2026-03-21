import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'documents',
    loadComponent: () =>
      import('./domains/documents/feature-document-list/document-list').then(
        (m) => m.DocumentList,
      ),
  },
  {
    path: 'administration',
    loadComponent: () =>
      import('./domains/administration-overview/administration-overview').then(
        (m) => m.AdministrationOverview,
      ),
  },
];
