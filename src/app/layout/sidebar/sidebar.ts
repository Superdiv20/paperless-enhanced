import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { NavDocuments } from './nav-documents/nav-documents';
import { sidebarData } from '../../shared/data/sidebar/sidebar-data';
import { lucideLeaf } from '@ng-icons/lucide';
import { NavOrganize } from './nav-organize/nav-organize';
import { NavLibrary } from './nav-library/nav-library';
import { NavAutomation } from './nav-automation/nav-automation';
import { NavAdministration } from './nav-administration/nav-administration';
import { NavSecondary } from './nav-secondary/nav-secondary';
import { NavSavedViews } from './nav-saved-views/nav-saved-views';

@Component({
  selector: 'paperless-sidebar',
  imports: [
    HlmSidebarImports,
    NgIcon,
    NavDocuments,
    NavLibrary,
    NavOrganize,
    NavAutomation,
    NavAdministration,
    NavSecondary,
    NavSavedViews
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  providers: [
    provideIcons({
      lucideLeaf,
    }),
  ],
})
export class Sidebar {
  public readonly savedViewsCount = input.required<number>();
  public readonly currentVersion = input<string>('v2.20.8'); // move somewhere else later on OR must be an input
  public readonly data = sidebarData;
}
