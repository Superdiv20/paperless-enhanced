import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCalendar,
  lucideCalendarFold,
  lucideCalendarPlus,
  lucideDownload,
  lucideEllipsis,
  lucideEye,
  lucideFile,
  lucideFileSearchCorner,
  lucideFileText,
  lucideFolderOpen,
  lucidePencil,
} from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';
import { Document } from '../../data/models/document';
import {
  DEFAULT_DISPLAY_FIELDS,
  DisplayField,
} from '../../data/models/document-display';

@Component({
  selector: 'paperless-document-card-vertical',
  imports: [
    DatePipe,
    NgIcon,
    HlmBadgeImports,
    HlmButtonImports,
    HlmCardImports,
    HlmCheckboxImports,
    HlmDropdownMenuImports,
    HlmTooltipImports,
  ],
  templateUrl: './document-card-vertical.html',
  styleUrl: './document-card-vertical.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      lucideCalendarFold,
      lucideCalendarPlus,
      lucidePencil,
      lucideDownload,
      lucideEllipsis,
      lucideEye,
      lucideFile,
      lucideFileText,
      lucideFolderOpen,
      lucideFileSearchCorner,
    }),
  ],
})
export class DocumentCardVertical {
  public readonly document = input.required<Document>();
  public readonly displayFields = input.required<DisplayField[]>();

  DisplayField = DisplayField;
  protected readonly thumbnailError = signal(false);
}
