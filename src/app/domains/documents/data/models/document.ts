// documents/models/document.model.ts
import { OwnedResource } from '@shared/data/models/permission';
import { CustomFieldInstance } from './custom-field';
import { DocumentNote } from './document-note';

export interface SearchHit {
  score?: number;
  rank?: number;
  highlights?: string;
  note_highlights?: string;
}

export interface Document extends OwnedResource {
  id: number;
  correspondent?: number;
  document_type?: number;
  storage_path?: number;
  title?: string;
  content?: string;
  tags?: number[];
  checksum?: string;
  created?: Date;
  modified?: Date;
  added?: Date;
  mime_type?: string;
  deleted_at?: Date;
  original_file_name?: string;
  archived_file_name?: string;
  download_url?: string;
  thumbnail_url?: string;
  archive_serial_number?: number;
  notes?: DocumentNote[];
  custom_fields?: CustomFieldInstance[];
  page_count?: number;
  duplicate_documents?: Document[];
  __search_hit__?: SearchHit;
  /** @write-only */
  remove_inbox_tags?: boolean;
  /** @internal frontend tracking only */
  __changedFields?: string[];
}
