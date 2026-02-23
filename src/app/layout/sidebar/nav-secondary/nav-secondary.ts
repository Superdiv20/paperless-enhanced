import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBookOpen, lucideCircleAlert } from '@ng-icons/lucide';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
  selector: 'paperless-nav-secondary',
  imports: [HlmSidebarImports, NgIcon],
  templateUrl: './nav-secondary.html',
  styleUrl: './nav-secondary.css',
  providers: [
    provideIcons({
      lucideBookOpen,
      lucideCircleAlert,
    }),
  ],
})
export class NavSecondary {
  public readonly currentVersion = input.required<string>();
}
