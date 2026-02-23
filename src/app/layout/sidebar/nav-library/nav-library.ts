import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight, lucideFolder } from '@ng-icons/lucide';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
  selector: 'paperless-nav-library',
  imports: [HlmSidebarImports, NgIcon, HlmCollapsibleImports, RouterLink],
  templateUrl: './nav-library.html',
  styleUrl: './nav-library.css',
  providers: [
    provideIcons({
      lucideFolder,
      lucideChevronRight,
    }),
  ],
})
export class NavLibrary {
  public readonly libraryItems = input.required<
    {
      title: string;
      url: string;
      icon: string;
      isActive?: boolean;
      items?: {
        title: string;
        url: string;
      }[];
    }[]
  >();
}
