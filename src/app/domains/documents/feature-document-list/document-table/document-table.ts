import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowDownWideNarrow,
  lucideArrowUpDown,
  lucideArrowUpNarrowWide,
  lucideCheck,
  lucideFile,
  lucideTag,
} from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmSkeletonImports } from '@spartan-ng/helm/skeleton';
import { HlmTableImports } from '@spartan-ng/helm/table';
import {
  ColumnDef,
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/angular-table';
import { Document } from '../../data/models/document';
import { DisplayField } from '../../data/models/document-display';

// Maps DisplayField enum values → TanStack column IDs (accessorKey strings)
const FIELD_TO_COLUMN_ID: Partial<Record<DisplayField, string>> = {
  [DisplayField.TITLE]: 'title',
  [DisplayField.CREATED]: 'created',
  [DisplayField.ADDED]: 'added',
  [DisplayField.TAGS]: 'tags',
  [DisplayField.CORRESPONDENT]: 'correspondent',
  [DisplayField.DOCUMENT_TYPE]: 'document_type',
  [DisplayField.PAGE_COUNT]: 'page_count',
  [DisplayField.ASN]: 'archive_serial_number',
  [DisplayField.OWNER]: 'owner',
};

@Component({
  selector: 'paperless-document-table',
  imports: [
    NgIcon,
    FlexRenderDirective,
    HlmBadgeImports,
    HlmCheckboxImports,
    HlmSkeletonImports,
    HlmTableImports,
  ],
  templateUrl: './document-table.html',
  styleUrl: './document-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      lucideArrowUpDown,
      lucideCheck,
      lucideFile,
      lucideTag,
      lucideArrowDownWideNarrow,
      lucideArrowUpNarrowWide,
    }),
  ],
})
export class DocumentTable {
  public readonly documents = input.required<Document[]>();
  public readonly displayFields = input.required<DisplayField[]>();
  public readonly loading = input(false);

  private readonly columnVisibility = computed(() => {
    const active = new Set(this.displayFields());
    return Object.fromEntries(
      Object.entries(FIELD_TO_COLUMN_ID).map(([field, colId]) => [
        colId,
        active.has(field as DisplayField),
      ]),
    );
  });

  protected readonly columns: ColumnDef<Document>[] = [
    {
      id: 'select',
      header: () => '',
      cell: () => '',
      enableSorting: false,
    },
    {
      accessorKey: 'title',
      header: () => 'Title',
      cell: (info) => info.getValue() ?? '—',
    },
    {
      accessorKey: 'correspondent',
      header: () => 'Correspondent',
      cell: (info) => info.getValue() ?? '—',
    },
    {
      accessorKey: 'document_type',
      header: () => 'Document Type',
      cell: (info) => info.getValue() ?? '—',
    },
    {
      accessorKey: 'created',
      header: () => 'Created',
      cell: (info) => {
        const val = info.getValue<Date | undefined>();
        return val ? new Intl.DateTimeFormat('de').format(new Date(val)) : '—';
      },
    },
    {
      accessorKey: 'added',
      header: () => 'Added',
      cell: (info) => {
        const val = info.getValue<Date | undefined>();
        return val ? new Intl.DateTimeFormat('de').format(new Date(val)) : '—';
      },
    },
    {
      accessorKey: 'modified',
      header: () => 'Modified',
      cell: (info) => {
        const val = info.getValue<Date | undefined>();
        return val ? new Intl.DateTimeFormat('de').format(new Date(val)) : '—';
      },
    },
    {
      accessorKey: 'tags',
      header: () => 'Tags',
      cell: (info) => {
        const tags = info.getValue<number[] | undefined>();
        return tags?.length ? tags.join(', ') : '—';
      },
      enableSorting: false,
    },
    {
      accessorKey: 'page_count',
      header: () => 'Pages',
      cell: (info) => info.getValue() ?? '—',
    },
    {
      accessorKey: 'archive_serial_number',
      header: () => 'ASN',
      cell: (info) => info.getValue() ?? '—',
    },
    {
      accessorKey: 'owner',
      header: () => 'Owner',
      cell: (info) => info.getValue() ?? '—',
    },
  ];

  protected readonly table = createAngularTable(() => ({
    data: this.documents(),
    columns: this.columns,
    state: {
      columnVisibility: this.columnVisibility(),
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  }));
}
