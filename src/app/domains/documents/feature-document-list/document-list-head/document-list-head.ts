import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowUpDown,
  lucideColumns3Cog,
  lucideFilter,
  lucideLayoutGrid,
  lucideList,
  lucideSearch,
  lucideTable,
} from '@ng-icons/lucide';
import { DocumentsStore } from '../../data/+store/documents.store';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { DisplayMode } from '../../data/models/display-mode';
import {
  DEFAULT_DISPLAY_FIELDS,
  DisplayField,
  DOCUMENT_SORT_FIELDS,
} from '../../data/models/document-display';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';
import { FilterEditor } from '../../ui/filter-editor/filter-editor';

@Component({
  selector: 'paperless-document-list-head',
  templateUrl: './document-list-head.html',
  styleUrl: './document-list-head.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HlmInputGroupImports,
    HlmToggleGroupImports,
    NgIcon,
    HlmButtonImports,
    HlmBadgeImports,
    HlmDropdownMenuImports,
    HlmSheetImports,
    FilterEditor,
  ],
  providers: [
    provideIcons({
      lucideSearch,
      lucideList,
      lucideTable,
      lucideLayoutGrid,
      lucideFilter,
      lucideArrowUpDown,
      lucideColumns3Cog,
    }),
  ],
})
export class DocumentListHead {
  private readonly documentStore = inject(DocumentsStore);

  DisplayMode = DisplayMode;

  protected readonly searchQuery = signal('');
  protected readonly filterCount = computed(() => this.documentStore.filters().length);
  protected readonly displayMode = this.documentStore.displayMode;
  protected readonly displayFields = this.documentStore.displayFields;
  protected readonly allDisplayFields = DEFAULT_DISPLAY_FIELDS;
  protected readonly sortFields = DOCUMENT_SORT_FIELDS;
  protected readonly currentSortField = this.documentStore.sortField;

  onDisplayModeChange(mode: DisplayMode) {
    this.documentStore.setDisplayMode(mode);
  }

  onSearchChange(query: string) {
    this.searchQuery.set(query);
  }

  isDisplayFieldActive(fieldId: DisplayField): boolean {
    return this.displayFields().some((f) => f.id === fieldId);
  }

  toggleDisplayField(fieldId: DisplayField): void {
    this.documentStore.toggleDisplayField(fieldId);
  }

  isSortFieldActive(field: { field: string; name: string }): boolean {
    const current = this.currentSortField();
    return current ? current.field === field.field : false;
  }

  setSortField(field: { field: string; name: string }): void {
    this.documentStore.setSortField(field);
  }
}
