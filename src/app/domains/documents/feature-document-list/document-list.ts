import { Component, computed, inject } from '@angular/core';
import { DocumentsStore } from '../data/+store/documents.store';
import { DocumentListHead } from './document-list-head/document-list-head';
import { DocumentCardHorizontal } from './document-card-horizontal/document-card-horizontal';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { lucideLoader } from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';
import { DocumentCardVertical } from './document-card-vertical/document-card-vertical';
import { DocumentTable } from './document-table/document-table';
import { DEFAULT_DISPLAY_FIELDS } from '../data/models/document-display';

@Component({
  selector: 'paperless-document-list',
  imports: [
    DocumentListHead,
    DocumentCardHorizontal,
    DocumentCardVertical,
    DocumentTable,
    HlmSpinnerImports,
  ],
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
  providers: [
    provideIcons({
      lucideLoader,
    }),
    DocumentsStore,
  ],
})
export class DocumentList {
  private readonly documentStore = inject(DocumentsStore);

  public readonly isLoading = this.documentStore.isPending;
  public readonly documents = this.documentStore.documents;
  public readonly viewMode = this.documentStore.displayMode;
  public readonly displayFieldIds = computed(() =>
    this.documentStore.displayFields().map((f) => f.id),
  );
}
