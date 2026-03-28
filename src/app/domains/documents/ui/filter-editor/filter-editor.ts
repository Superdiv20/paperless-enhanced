import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { DocumentsStore } from '../../data/+store/documents.store';
import { TagsStore } from '@shared/data/+store/tags.store';
import { CorrespondentsStore } from '@shared/data/+store/correspondents.store';
import { DocumentTypesStore } from '@shared/data/+store/document-types.store';
import { Tag } from '@shared/data/models/tag';
import { Correspondet } from '@shared/data/models/correspondent';
import { DocumentType } from '@shared/data/models/document-type';
import { FilterRule } from '@shared/data/models/filter-rule';
import {
  FILTER_DOES_NOT_HAVE_CORRESPONDENT,
  FILTER_HAS_CORRESPONDENT_ANY,
  FILTER_DOES_NOT_HAVE_DOCUMENT_TYPE,
  FILTER_HAS_DOCUMENT_TYPE_ANY,
  FILTER_HAS_TAGS_ALL,
  FILTER_HAS_TAGS_ANY,
} from '@shared/data/models/filter-rule-type';
import { HlmComboboxImports } from '@shared/ui-common/combobox/src';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';
import { ModeChangeConfig } from './filter-mode-change.config';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTag, lucideUser, lucideFileType } from '@ng-icons/lucide';

const TAG_RULE_TYPES = [FILTER_HAS_TAGS_ALL, FILTER_HAS_TAGS_ANY];
const CORRESPONDENT_RULE_TYPES = [
  FILTER_HAS_CORRESPONDENT_ANY,
  FILTER_DOES_NOT_HAVE_CORRESPONDENT,
];
const DOCUMENT_TYPE_RULE_TYPES = [
  FILTER_HAS_DOCUMENT_TYPE_ANY,
  FILTER_DOES_NOT_HAVE_DOCUMENT_TYPE,
];

@Component({
  selector: 'paperless-filter-editor',
  imports: [HlmComboboxImports, HlmLabelImports, HlmToggleGroupImports, NgIcon],
  templateUrl: './filter-editor.html',
  styleUrl: './filter-editor.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      lucideTag,
      lucideUser,
      lucideFileType,
    }),
  ],
})
export class FilterEditor {
  private readonly documentsStore = inject(DocumentsStore);
  private readonly tagsStore = inject(TagsStore);
  private readonly correspondentsStore = inject(CorrespondentsStore);
  private readonly documentTypesStore = inject(DocumentTypesStore);

  protected readonly tags = this.tagsStore.tags;
  protected readonly correspondents = this.correspondentsStore.correspondents;
  protected readonly documentTypes = this.documentTypesStore.documentTypes;

  public readonly FILTER_HAS_CORRESPONDENT_ANY = FILTER_HAS_CORRESPONDENT_ANY;
  public readonly FILTER_DOES_NOT_HAVE_CORRESPONDENT =
    FILTER_DOES_NOT_HAVE_CORRESPONDENT;

  protected readonly tagMode = signal<'all' | 'any'>('all');
  protected readonly correspondentMode = signal<'include' | 'exclude'>('include');
  protected readonly documentTypeMode = signal<'include' | 'exclude'>('include');

  private readonly tagRuleType = computed(() =>
    this.tagMode() === 'all' ? FILTER_HAS_TAGS_ALL : FILTER_HAS_TAGS_ANY,
  );

  private readonly correspondentRuleType = computed(() =>
    this.correspondentMode() === 'include'
      ? FILTER_HAS_CORRESPONDENT_ANY
      : FILTER_DOES_NOT_HAVE_CORRESPONDENT,
  );

  private readonly documentTypeRuleType = computed(() =>
    this.documentTypeMode() === 'include'
      ? FILTER_HAS_DOCUMENT_TYPE_ANY
      : FILTER_DOES_NOT_HAVE_DOCUMENT_TYPE,
  );

  // Derived from the store — survives sheet close/reopen
  protected readonly selectedTags = computed<Tag[]>(() => {
    const allTags = this.tagsStore.tags();
    const ruleType = this.tagRuleType();
    const tagIds = this.documentsStore
      .filters()
      .filter((r) => r.rule_type === ruleType)
      .map((r) => Number(r.value));
    return allTags.filter((t) => tagIds.includes(t.id!));
  });

  protected readonly selectedCorrespondents = computed<Correspondet[]>(() => {
    const all = this.correspondentsStore.correspondents();
    const ruleType = this.correspondentRuleType();
    const ids = this.documentsStore
      .filters()
      .filter((r) => r.rule_type === ruleType)
      .map((r) => Number(r.value));
    return all.filter((c) => ids.includes(c.id!));
  });

  protected readonly selectedDocumentTypes = computed<DocumentType[]>(() => {
    const all = this.documentTypesStore.documentTypes();
    const ruleType = this.documentTypeRuleType();
    const ids = this.documentsStore
      .filters()
      .filter((r) => r.rule_type === ruleType)
      .map((r) => Number(r.value));
    return all.filter((dt) => ids.includes(dt.id!));
  });

  protected onTagModeChange(mode: 'all' | 'any'): void {
    this.tagMode.set(mode);
    const existingTagFilters = this.documentsStore
      .filters()
      .filter((r) => TAG_RULE_TYPES.includes(r.rule_type));
    if (existingTagFilters.length > 0) {
      const newRuleType =
        mode === 'all' ? FILTER_HAS_TAGS_ALL : FILTER_HAS_TAGS_ANY;
      const nonTagRules = this.documentsStore
        .filters()
        .filter((r) => !TAG_RULE_TYPES.includes(r.rule_type));
      const migratedRules: FilterRule[] = existingTagFilters.map((r) => ({
        ...r,
        rule_type: newRuleType,
      }));
      this.documentsStore.setFilters([...nonTagRules, ...migratedRules]);
    }
  }

  protected onTagsChange(tags: Tag[]): void {
    const nonTagRules = this.documentsStore
      .filters()
      .filter((r) => !TAG_RULE_TYPES.includes(r.rule_type));
    const ruleType = this.tagRuleType();
    const tagRules: FilterRule[] = tags.map((tag) => ({
      rule_type: ruleType,
      value: String(tag.id),
    }));
    this.documentsStore.setFilters([...nonTagRules, ...tagRules]);
  }

  protected onCorrespondentsChange(correspondents: Correspondet[]): void {
    const nonCorrespondentRules = this.documentsStore
      .filters()
      .filter((r) => !CORRESPONDENT_RULE_TYPES.includes(r.rule_type));
    const ruleType = this.correspondentRuleType();
    const correspondentRules: FilterRule[] = correspondents.map((c) => ({
      rule_type: ruleType,
      value: String(c.id),
    }));
    this.documentsStore.setFilters([
      ...nonCorrespondentRules,
      ...correspondentRules,
    ]);
  }

  protected onDocumentTypesChange(documentTypes: DocumentType[]): void {
    const nonDocumentTypeRules = this.documentsStore
      .filters()
      .filter((r) => !DOCUMENT_TYPE_RULE_TYPES.includes(r.rule_type));
    const ruleType = this.documentTypeRuleType();
    const documentTypeRules: FilterRule[] = documentTypes.map((dt) => ({
      rule_type: ruleType,
      value: String(dt.id),
    }));
    this.documentsStore.setFilters([
      ...nonDocumentTypeRules,
      ...documentTypeRules,
    ]);
  }

  protected onCorrespondentModeChange(mode: 'include' | 'exclude'): void {
    this.onModeChange(mode, {
      ruleTypes: CORRESPONDENT_RULE_TYPES,
      includeRuleType: FILTER_HAS_CORRESPONDENT_ANY,
      excludeRuleType: FILTER_DOES_NOT_HAVE_CORRESPONDENT,
      modeSignal: this.correspondentMode,
    });
  }

  protected onDocumentTypeModeChange(mode: 'include' | 'exclude'): void {
    this.onModeChange(mode, {
      ruleTypes: DOCUMENT_TYPE_RULE_TYPES,
      includeRuleType: FILTER_HAS_DOCUMENT_TYPE_ANY,
      excludeRuleType: FILTER_DOES_NOT_HAVE_DOCUMENT_TYPE,
      modeSignal: this.documentTypeMode,
    });
  }

  protected tagLabel(tag: Tag): string {
    return tag.name ?? '';
  }

  protected correspondentLabel(correspondent: Correspondet): string {
    return correspondent.name ?? '';
  }

  protected documentTypeLabel(documentType: DocumentType): string {
    return documentType.name ?? '';
  }

  /**
   * Generalized handler for include/exclude mode changes
   */
  private onModeChange(
    mode: 'include' | 'exclude',
    config: ModeChangeConfig,
  ): void {
    config.modeSignal.set(mode);
    const newRuleType =
      mode === 'include' ? config.includeRuleType : config.excludeRuleType;
    const currentFilters = this.documentsStore.filters();
    const matching = currentFilters.filter((r) =>
      config.ruleTypes.includes(r.rule_type),
    );

    if (matching.length === 0) return;

    this.documentsStore.setFilters([
      ...currentFilters.filter((r) => !config.ruleTypes.includes(r.rule_type)),
      ...matching.map((r) => ({ ...r, rule_type: newRuleType })),
    ]);
  }
}
