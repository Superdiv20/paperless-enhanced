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
  lucideCalendar,
  lucideCalendarDays,
  lucideColumns3Cog,
  lucideFilter,
  lucideLayoutGrid,
  lucideList,
  lucideSave,
  lucideSearch,
  lucideTable,
  lucideX,
} from '@ng-icons/lucide';
import { DocumentsStore } from '../../data/+store/documents.store';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { DisplayMode } from '../../data/models/display-mode';
import {
  DisplayField,
  DOCUMENT_SORT_FIELDS,
} from '../../data/models/document-display';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';
import { FilterEditor } from '../../ui/filter-editor/filter-editor';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmCalendarImports } from '@spartan-ng/helm/calendar';
import {
  DatePreset,
  dateRangeForPreset,
} from '../../data/models/document-filters';

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
    HlmSeparatorImports,
    HlmDialogImports,
    HlmCalendarImports,
    HlmSeparatorImports
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
      lucideX,
      lucideSave,
      lucideCalendarDays,
    }),
  ],
})
export class DocumentListHead {
  private readonly documentStore = inject(DocumentsStore);

  DisplayMode = DisplayMode;

  protected readonly minDate = new Date(2000, 0, 1);
  protected readonly maxDate = new Date(2100, 11, 31);

  // Dialog-local pending date state (written to store on Apply)
  protected readonly dialogDateField = signal<'created' | 'added'>('created');
  protected readonly dialogDatePreset = signal<DatePreset | null>(null);
  protected readonly dialogDateStart = signal<Date | null>(null);
  protected readonly dialogDateEnd = signal<Date | null>(null);

  protected readonly isDateFilterActive = computed(() => {
    const f = this.documentStore.documentFilters();
    const cd = f.createdDate;
    const ad = f.addedDate;
    return cd.preset !== null || cd.from !== null ||
           ad.preset !== null || ad.from !== null;
  });

  protected onDateDialogOpen(): void {
    const f = this.documentStore.documentFilters();
    const date = this.dialogDateField() === 'created' ? f.createdDate : f.addedDate;
    this.dialogDatePreset.set(date.preset);
    this.dialogDateStart.set(date.from ? new Date(date.from) : null);
    this.dialogDateEnd.set(date.to ? new Date(date.to) : null);
  }

  protected onDialogDateFieldChange(field: 'created' | 'added'): void {
    this.dialogDateField.set(field);
    const f = this.documentStore.documentFilters();
    const date = field === 'created' ? f.createdDate : f.addedDate;
    this.dialogDatePreset.set(date.preset);
    this.dialogDateStart.set(date.from ? new Date(date.from) : null);
    this.dialogDateEnd.set(date.to ? new Date(date.to) : null);
  }

  protected onDialogPresetChange(preset: string | null): void {
    if (!preset) {
      this.dialogDatePreset.set(null);
      this.dialogDateStart.set(null);
      this.dialogDateEnd.set(null);
      return;
    }
    const p = preset as DatePreset;
    const range = dateRangeForPreset(p);
    this.dialogDatePreset.set(p);
    this.dialogDateStart.set(new Date(range.from));
    this.dialogDateEnd.set(new Date(range.to));
  }

  protected onCalendarStartChange(date: Date | undefined): void {
    this.dialogDatePreset.set(null);
    this.dialogDateStart.set(date ?? null);
  }

  protected onCalendarEndChange(date: Date | undefined): void {
    this.dialogDatePreset.set(null);
    this.dialogDateEnd.set(date ?? null);
  }

  protected applyDateFilter(): void {
    const field = this.dialogDateField();
    const preset = this.dialogDatePreset();
    if (preset) {
      this.documentStore.setDateFilter(field, preset);
      return;
    }
    const start = this.dialogDateStart();
    const end = this.dialogDateEnd();
    if (start && end) {
      const fmt = (d: Date) => d.toISOString().split('T')[0];
      this.documentStore.setCustomDateFilter(field, fmt(start), fmt(end));
    } else {
      this.documentStore.clearDateFilter(field);
    }
  }

  protected readonly searchQuery = signal('');
  protected readonly filterCount = computed(
    () => this.documentStore.filterRules().length,
  );
  protected readonly displayMode = this.documentStore.displayMode;
  protected readonly displayFields = this.documentStore.visibleDisplayFields;
  protected readonly allDisplayFields = this.documentStore.availableDisplayFields;
  protected readonly sortFields = DOCUMENT_SORT_FIELDS;
  protected readonly currentSortField = this.documentStore.sortField;

  protected onDisplayModeChange(mode: DisplayMode) {
    this.documentStore.setDisplayMode(mode);
  }

  protected onSearchChange(query: string) {
    this.searchQuery.set(query);
  }

  protected isDisplayFieldActive(fieldId: DisplayField): boolean {
    return this.displayFields().some((f) => f.id === fieldId);
  }

  protected toggleDisplayField(fieldId: DisplayField): void {
    this.documentStore.toggleDisplayField(fieldId);
  }

  protected isSortFieldActive(field: { field: string; name: string }): boolean {
    const current = this.currentSortField();
    return current ? current.field === field.field : false;
  }

  protected setSortField(field: { field: string; name: string }): void {
    this.documentStore.setSortField(field);
  }

  protected clearFilters(): void {
    this.documentStore.clearAllFilters();
  }
}
