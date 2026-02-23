import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight, lucideSettings2 } from '@ng-icons/lucide';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
  selector: 'paperless-nav-administration',
  imports: [
    HlmSidebarImports,
    NgIcon,
    HlmCollapsibleImports,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './nav-administration.html',
  styleUrl: './nav-administration.css',
  providers: [
    provideIcons({
      lucideChevronRight,
      lucideSettings2,
    }),
  ],
})
export class NavAdministration {
  public readonly administrationItems = input.required<
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
