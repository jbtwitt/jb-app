import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getAssetJsonData(uri: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`/assets/${uri}`);
  }
  // convert csv string array to object
  // first row must be header
  array2Json(srcArr: any[]): any[] {
    const header = srcArr[0];
    const result = [];
    for (let i=1; i<srcArr.length; i++) {
      const row = srcArr[i];
      const obj = {};
      for (let j=0; j<header.length; j++) {
        obj[header[j]] = row[j];
      }
      result.push(obj);
    }
    return result;
  }
  getAssetCsvData(uri: string): Observable<any[]> {
    return this.httpClient
      .get<any>(`/assets/${uri}`, {responseType: 'text' as 'json',})
      .pipe(
        // transform csv string to array
        map((str: string) => str.split('\n').filter(l => l.length > 0)),
        // convert to json
        map((lines: string[]) => {
          const rows = [];
          lines.forEach(line => {
            line = line.replace('\r', '');
            rows.push(line.split(','))
          });
          return this.array2Json(rows);
        })
      );
  }
}
