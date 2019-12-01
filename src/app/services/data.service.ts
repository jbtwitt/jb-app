import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getBookmarksCollection(): Observable<any[]> {
    return this.httpClient.get<any[]>('/assets/bookmarks-collection.json');
  }
  getHqCollection(): Observable<any[]> {
    return this.httpClient.get<any[]>('/assets/hqrobot.json');
  }
  getPiAddr(): Observable<any[]> {
    return this.httpClient.get<any[]>('/assets/pi-addr.json');
  }
}
