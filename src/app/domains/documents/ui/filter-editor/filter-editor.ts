import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DocumentsStore } from '../../data/+store/documents.store';
import { TagsStore } from '@shared/data/+store/tags.store';
import { CorrespondentsStore } from '@shared/data/+store/correspondents.store';
import { DocumentTypesStore } from '@shared/data/+store/document-types.store';
import { StoragePathsStore } from '@shared/data/+store/storage-paths.store';
import { UsersStore } from '@shared/data/+store/users.store';
import { Tag } from '@shared/data/models/tag';
import { Correspondet } from '@shared/data/models/correspondent';
import { DocumentType } from '@shared/data/models/document-type';
import { StoragePath } from '@shared/data/models/storage-path';
import { User } from '@shared/data/models/user';
import { HlmComboboxImports } from '@shared/ui-common/combobox/src';
import { HlmSwitchImports } from '@shared/ui-common/switch/src';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideTag,
  lucideUser,
  lucideFileType,
  lucideFolderOpen,
  lucideShield,
} from '@ng-icons/lucide';

@Component({
  selector: 'paperless-filter-editor',
  imports: [
    HlmComboboxImports,
    HlmSwitchImports,
    HlmLabelImports,
    NgIcon,
  ],
  templateUrl: './filter-editor.html',
  styleUrl: './filter-editor.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({ lucideTag, lucideUser, lucideFileType, lucideFolderOpen, lucideShield }),
  ],
})
export class FilterEditor {
  private readonly store = inject(DocumentsStore);

  // Reference data for comboboxes
  protected readonly tags = inject(TagsStore).tags;
  protected readonly correspondents = inject(CorrespondentsStore).correspondents;
  protected readonly documentTypes = inject(DocumentTypesStore).documentTypes;
  protected readonly storagePaths = inject(StoragePathsStore).storagePaths;
  protected readonly users = inject(UsersStore).users;

  // Selected items — derived from store
  protected readonly selectedTags = this.store.selectedTags;
  protected readonly selectedCorrespondents = this.store.selectedCorrespondents;
  protected readonly selectedDocumentTypes = this.store.selectedDocumentTypes;
  protected readonly selectedStoragePaths = this.store.selectedStoragePaths;
  protected readonly selectedOwners = this.store.selectedOwners;

  // Modes — derived from store
  protected readonly tagMode = computed(() => this.store.documentFilters().tags.mode);
  protected readonly correspondentMode = computed(() => this.store.documentFilters().correspondents.mode);
  protected readonly documentTypeMode = computed(() => this.store.documentFilters().documentTypes.mode);
  protected readonly storagePathMode = computed(() => this.store.documentFilters().storagePaths.mode);
  protected readonly ownerMode = computed(() => this.store.documentFilters().owner.mode);
  protected readonly ownerIncludeUnowned = computed(() => this.store.documentFilters().owner.includeUnowned);

  // Tag handlers
  protected onTagsChange(tags: Tag[]): void {
    this.store.setTagFilter(tags.map((t) => t.id!));
  }

  protected onTagModeChange(mode: 'all' | 'any'): void {
    this.store.setTagMode(mode);
  }

  // Correspondent handlers
  protected onCorrespondentsChange(correspondents: Correspondet[]): void {
    this.store.setCorrespondentFilter(correspondents.map((c) => c.id!));
  }

  protected onCorrespondentModeChange(mode: 'include' | 'exclude'): void {
    this.store.setCorrespondentMode(mode);
  }

  // Document type handlers
  protected onDocumentTypesChange(documentTypes: DocumentType[]): void {
    this.store.setDocumentTypeFilter(documentTypes.map((dt) => dt.id!));
  }

  protected onDocumentTypeModeChange(mode: 'include' | 'exclude'): void {
    this.store.setDocumentTypeMode(mode);
  }

  // Storage path handlers
  protected onStoragePathsChange(storagePaths: StoragePath[]): void {
    this.store.setStoragePathFilter(storagePaths.map((sp) => sp.id!));
  }

  protected onStoragePathModeChange(mode: 'include' | 'exclude'): void {
    this.store.setStoragePathMode(mode);
  }

  // Owner handlers
  protected onOwnersChange(owners: User[]): void {
    this.store.setOwnerFilter(owners.map((u) => u.id!));
  }

  protected onOwnerModeChange(mode: 'include' | 'exclude'): void {
    this.store.setOwnerMode(mode);
  }

  protected onOwnerIncludeUnownedChange(include: boolean): void {
    this.store.setOwnerIncludeUnowned(include);
  }

  // Label helpers for comboboxes
  protected tagLabel(tag: Tag): string {
    return tag.name ?? '';
  }

  protected correspondentLabel(correspondent: Correspondet): string {
    return correspondent.name ?? '';
  }

  protected documentTypeLabel(documentType: DocumentType): string {
    return documentType.name ?? '';
  }

  protected storagePathLabel(storagePath: StoragePath): string {
    return storagePath.name ?? '';
  }

  protected userLabel(user: User): string {
    return user.username ?? '';
  }
}
