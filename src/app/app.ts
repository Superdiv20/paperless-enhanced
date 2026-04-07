import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { Sidebar } from './layout/sidebar/sidebar';
import { Topbar } from './layout/topbar/topbar';
import { SavedViewsStore } from '@shared/data/+store/saved-views.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmSidebarImports, Sidebar, Topbar],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('paperless-enhanced');
  private readonly savedViewsStore = inject(SavedViewsStore);

  public savedViewsCount = this.savedViewsStore.count;
}
