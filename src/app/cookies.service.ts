import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banner } from './models/Banner';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  constructor(private _httpClient: HttpClient) {}

  getCookies = (): Observable<Banner> => {
    return this._httpClient.get<Banner>(
      'https://fast-lowlands-95849.herokuapp.com/api/common/getBanner'
    );
  };
}
