import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Document } from '../models/document';
import { SearchResult } from '@shared/data/models/search-result';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  public getDocuments(params: { ordering?: string } = {}): Observable<SearchResult<Document>> {
    const credentials = btoa(
      `${environment.authUser}:${environment.authPassword}`,
    );
    const headers = new HttpHeaders({
      Authorization: `Basic ${credentials}`,
    });
    let httpParams = new HttpParams();
    if (params.ordering) {
      httpParams = httpParams.set('ordering', params.ordering);
    }
    return this.http.get<SearchResult<Document>>(`${this.apiUrl}/documents/`, {
      headers,
      params: httpParams,
    });
  }
}
