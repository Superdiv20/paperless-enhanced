import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChevronRight,
  lucideTag,
} from '@ng-icons/lucide';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
  selector: 'paperless-nav-organize',
  imports: [HlmSidebarImports, NgIcon, HlmCollapsibleImports, RouterLink],
  templateUrl: './nav-organize.html',
  styleUrl: './nav-organize.css',
  providers: [
    provideIcons({
      lucideTag,
      lucideChevronRight,
    }),
  ],
})
export class NavOrganize {
  public readonly organizeItems = input.required<
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
