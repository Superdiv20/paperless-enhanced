import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';
import { Document } from '../../data/models/document';
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
import { DisplayField } from '../../data/models/document-display';

@Component({
  selector: 'paperless-document-card-horizontal',
  imports: [
    DatePipe,
    NgIcon,
    HlmBadgeImports,
    HlmButtonImports,
    HlmCheckboxImports,
    HlmDropdownMenuImports,
    HlmTooltipImports,
  ],
  templateUrl: './document-card-horizontal.html',
  styleUrl: './document-card-horizontal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      lucideEye,
      lucideFolderOpen,
      lucideDownload,
      lucideEllipsis,
      lucideFileText,
      lucideFile,
      lucideCalendarFold,
      lucideCalendarPlus,
      lucidePencil,
      lucideFileSearchCorner,
    }),
  ],
})
export class DocumentCardHorizontal {
  public readonly document = input.required<Document>();
  public readonly displayFields = input.required<DisplayField[]>();

  protected readonly DisplayField = DisplayField;
  protected readonly thumbnailError = signal(false);
}
