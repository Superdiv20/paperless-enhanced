import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '@environments/environment';
import { Correspondet } from '@shared/data/models/correspondent';
import { SearchResult } from '@shared/data/models/search-result';

@Injectable({
  providedIn: 'root',
})
export class CorrespondentService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getAllCorrespondents(): Promise<SearchResult<Correspondet>> {
    const params = new HttpParams().set('page_size', '10000');
    return firstValueFrom(
      this.http.get<SearchResult<Correspondet>>(`${this.apiUrl}/correspondents/`, { params }),
    );
  }
}
