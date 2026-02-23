import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { NavDocuments } from './nav-documents/nav-documents';
import { sidebarData } from '../../shared/data/sidebar/sidebar-data';
import { lucideLeaf } from '@ng-icons/lucide';
import { NavOrganize } from './nav-organize/nav-organize';
import { NavLibrary } from './nav-library/nav-library';
import { NavAutomation } from './nav-automation/nav-automation';
import { NavAdministration } from './nav-administration/nav-administration';

@Component({
  selector: 'paperless-sidebar',
  imports: [HlmSidebarImports, NgIcon, NavDocuments, NavLibrary, NavOrganize, NavAutomation, NavAdministration],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  providers: [
    provideIcons({
      lucideLeaf,
    }),
  ],
})
export class Sidebar {
  public readonly data = sidebarData;
}
