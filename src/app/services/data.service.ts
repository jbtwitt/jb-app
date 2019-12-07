import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getNotes(): Observable<any[]> {
    return this.httpClient.get<any[]>('/assets/notes.json');
  }
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
