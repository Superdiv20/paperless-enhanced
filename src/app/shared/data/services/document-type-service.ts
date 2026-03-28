import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '@environments/environment';
import { DocumentType } from '@shared/data/models/document-type';
import { SearchResult } from '@shared/data/models/search-result';

@Injectable({
  providedIn: 'root',
})
export class DocumentTypeService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getAllDocumentTypes(): Promise<SearchResult<DocumentType>> {
    const params = new HttpParams().set('page_size', '10000');
    return firstValueFrom(
      this.http.get<SearchResult<DocumentType>>(`${this.apiUrl}/document_types/`, { params }),
    );
  }
}
