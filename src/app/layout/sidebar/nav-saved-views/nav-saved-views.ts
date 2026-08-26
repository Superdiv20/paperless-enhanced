import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBookMarked } from '@ng-icons/lucide';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { AppSettingsStore } from '@shared/data/+store/app-settings.store';

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
  private readonly appSettingsStore = inject(AppSettingsStore);

  navItem = input.required<{
    title: string;
    icon: any;
    url: string;
    isActive?: boolean;
  }>();
  savedViewsCount = input.required<number>();
  showSavedViewsCount = this.appSettingsStore.sidebarViewsShowCount;
}
