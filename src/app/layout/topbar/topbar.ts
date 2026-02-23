import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { lucideSearch } from '@ng-icons/lucide';

@Component({
  selector: 'paperless-topbar',
  imports: [
    HlmSidebarImports,
    HlmSeparatorImports,
    HlmInputGroupImports,
    NgIcon,
  ],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
  providers: [provideIcons({ lucideSearch })],
})
export class Topbar {}
