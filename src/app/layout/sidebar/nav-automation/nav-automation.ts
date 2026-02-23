import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight, lucideWorkflow } from '@ng-icons/lucide';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
  selector: 'paperless-nav-automation',
  imports: [HlmSidebarImports, NgIcon, HlmCollapsibleImports, RouterLink],
  templateUrl: './nav-automation.html',
  styleUrl: './nav-automation.css',
  providers: [
    provideIcons({
      lucideWorkflow,
      lucideChevronRight,
    }),
  ],
})
export class NavAutomation {
  public readonly automationItems = input.required<
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
