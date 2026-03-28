import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { firstValueFrom } from 'rxjs';
import { Document } from '../models/document';
import { SearchResult } from '@shared/data/models/search-result';
import { FilterRule } from '@shared/data/models/filter-rule';
import { FILTER_RULE_TYPES } from '@shared/data/models/filter-rule-type';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  public async getDocuments(
    filters: FilterRule[] = [],
    params: {
      page?: number;
      page_size?: number;
      ordering?: string;
      truncate_content?: boolean;
      [key: string]: string | number | boolean | undefined;
    } = {},
  ): Promise<SearchResult<Document>> {
    let httpParams = new HttpParams();

    for (const rule of filters) {
      const ruleType = FILTER_RULE_TYPES.find((rt) => rt.id === rule.rule_type);
      if (ruleType && rule.value != null) {
        httpParams = httpParams.append(ruleType.filtervar, rule.value);
      }
    }

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        httpParams = httpParams.set(key, String(value));
      }
    });

    return firstValueFrom(
      this.http.get<SearchResult<Document>>(`${this.apiUrl}/documents/`, {
        params: httpParams,
      }),
    );
  }
}
