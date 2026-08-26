import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '@environments/environment';
import { AppSettings } from '@shared/data/models/app-settings';

export type SaveAppSettingsResponse = {
  success: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class AppSettingsRepository {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  fetch(): Promise<AppSettings> {
    return firstValueFrom(this.http.get<AppSettings>(`${this.apiUrl}/ui_settings/`));
  }

  save(settings: Record<string, unknown>): Promise<SaveAppSettingsResponse> {
    return firstValueFrom(
      this.http.post<SaveAppSettingsResponse>(`${this.apiUrl}/ui_settings/`, {
        settings,
      }),
    );
  }
}
