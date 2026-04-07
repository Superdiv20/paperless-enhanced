import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBookMarked } from '@ng-icons/lucide';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
  selector: 'paperless-nav-saved-views',
  imports: [HlmSidebarImports, NgIcon, RouterLink],
  templateUrl: './nav-saved-views.html',
  styleUrl: './nav-saved-views.css',
  providers: [
    provideIcons({
      lucideBookMarked,
    }),
  ],
})
export class NavSavedViews {
  navItem = input.required<{
    title: string;
    icon: any;
    url: string;
    isActive?: boolean;
  }>();
  savedViewsCount = input.required<number>();
}
