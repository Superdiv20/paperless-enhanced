import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFileText } from '@ng-icons/lucide';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
  selector: 'paperless-nav-documents',
  imports: [HlmSidebarImports, NgIcon, RouterLink],
  templateUrl: './nav-documents.html',
  styleUrl: './nav-documents.css',
  providers: [
    provideIcons({
      lucideFileText,
    }),
  ],
})
export class NavDocuments {
  navItem = input.required<{
    title: string;
    icon: any;
    url: string;
    isActive?: boolean;
  }>();
}
