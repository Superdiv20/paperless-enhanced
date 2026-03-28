import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '@environments/environment';
import { Tag } from '@shared/data/models/tag';
import { SearchResult } from '@shared/data/models/search-result';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getAllTags(): Promise<SearchResult<Tag>> {
    const params = new HttpParams().set('page_size', '10000');
    return firstValueFrom(
      this.http.get<SearchResult<Tag>>(`${this.apiUrl}/tags/`, { params }),
    );
  }
}
