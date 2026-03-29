import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '@environments/environment';
import { StoragePath } from '@shared/data/models/storage-path';
import { SearchResult } from '@shared/data/models/search-result';

@Injectable({
  providedIn: 'root',
})
export class StoragePathService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getAllStoragePaths(): Promise<SearchResult<StoragePath>> {
    const params = new HttpParams().set('page_size', '10000');
    return firstValueFrom(
      this.http.get<SearchResult<StoragePath>>(`${this.apiUrl}/storage_paths/`, { params }),
    );
  }
}
