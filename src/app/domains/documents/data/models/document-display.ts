export enum DisplayField {
  TITLE = 'title',
  CREATED = 'created',
  ADDED = 'added',
  MODIFIED = 'modified',
  TAGS = 'tag',
  CORRESPONDENT = 'correspondent',
  DOCUMENT_TYPE = 'documenttype',
  STORAGE_PATH = 'storagepath',
  CUSTOM_FIELD = 'custom_field_',
  NOTES = 'note',
  OWNER = 'owner',
  SHARED = 'shared',
  ASN = 'asn',
  PAGE_COUNT = 'pagecount',
}

export type SortField = {
  field: string;
  name: string;
}

export const DEFAULT_DISPLAY_FIELDS: { id: DisplayField; name: string }[] = [
  { id: DisplayField.TITLE, name: 'Title' },
  { id: DisplayField.CREATED, name: 'Created' },
  { id: DisplayField.ADDED, name: 'Added' },
  { id: DisplayField.MODIFIED, name: 'Modified' },
  { id: DisplayField.TAGS, name: 'Tags' },
  { id: DisplayField.CORRESPONDENT, name: 'Correspondent' },
  { id: DisplayField.DOCUMENT_TYPE, name: 'Document Type' },
  { id: DisplayField.STORAGE_PATH, name: 'Storage Path' },
  { id: DisplayField.NOTES, name: 'Notes' },
  { id: DisplayField.OWNER, name: 'Owner' },
  { id: DisplayField.SHARED, name: 'Shared' },
  { id: DisplayField.ASN, name: 'ASN' },
  { id: DisplayField.PAGE_COUNT, name: 'Pages' },
];

export const ALWAYS_VISIBLE_DISPLAY_FIELDS = new Set<DisplayField>([
  DisplayField.TITLE,
  DisplayField.CREATED,
  DisplayField.ADDED,
  DisplayField.ASN,
  DisplayField.PAGE_COUNT,
  DisplayField.SHARED,
]);

export const DISPLAY_FIELD_PERMISSION_TOKENS: Partial<Record<DisplayField, string[]>> = {
  [DisplayField.TAGS]: ['tag'],
  [DisplayField.CORRESPONDENT]: ['correspondent'],
  [DisplayField.DOCUMENT_TYPE]: ['documenttype', 'document_type'],
  [DisplayField.STORAGE_PATH]: ['storagepath', 'storage_path'],
  [DisplayField.NOTES]: ['note'],
  [DisplayField.OWNER]: ['user'],
};

export const DEFAULT_DASHBOARD_DISPLAY_FIELDS: DisplayField[] = [
  DisplayField.CREATED,
  DisplayField.TITLE,
  DisplayField.TAGS,
  DisplayField.CORRESPONDENT,
];

export const DEFAULT_DASHBOARD_VIEW_PAGE_SIZE = 10;

export const DOCUMENT_SORT_FIELDS: SortField[] = [
  { field: 'archive_serial_number', name: 'ASN' },
  { field: 'correspondent__name', name: 'Correspondent' },
  { field: 'title', name: 'Title' },
  { field: 'document_type__name', name: 'Document Type' },
  { field: 'created', name: 'Created' },
  { field: 'added', name: 'Added' },
  { field: 'modified', name: 'Modified' },
  { field: 'num_notes', name: 'Notes' },
  { field: 'owner', name: 'Owner' },
  { field: 'page_count', name: 'Pages' },
];

export const DOCUMENT_SORT_FIELDS_FULLTEXT: SortField[] =
  [{ field: 'score', name: 'Search Score' }];
