import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '@environments/environment';
import { User } from '@shared/data/models/user';
import { SearchResult } from '@shared/data/models/search-result';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getAllUsers(): Promise<SearchResult<User>> {
    const params = new HttpParams().set('page_size', '10000');
    return firstValueFrom(
      this.http.get<SearchResult<User>>(`${this.apiUrl}/users/`, { params }),
    );
  }
}
