// documents/models/document.model.ts
import { OwnedResource } from '@shared/data/models/permission';
import { Tag } from '@shared/data/models/tag';
import { Correspondet } from '@shared/data/models/correspondent';
import { DocumentType } from '@shared/data/models/document-type';
import { StoragePath } from '@shared/data/models/storage-path';
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

/** Document with IDs resolved to full objects from the reference stores. */
export type ResolvedDocument = Omit<Document, 'correspondent' | 'document_type' | 'storage_path' | 'tags'> & {
  correspondent?: Correspondet;
  document_type?: DocumentType;
  storage_path?: StoragePath;
  tags?: Tag[];
};