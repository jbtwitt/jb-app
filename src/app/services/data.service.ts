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
  //
  // convert csv line string array to object
  // first row must be header
  lines2Json(lines: any[]): any[] {
    const headers = lines[0];
    for (let i=0; i<headers.length; i++) {
      headers[i] = headers[i].replace(' ', '_');
    }
    const result = [];
    for (let i=1; i<lines.length; i++) {
      const obj = {};
      const row = lines[i];
      for (let j=0; j<headers.length; j++) {
        obj[headers[j]] = row[j];
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
          return this.lines2Json(rows);
        }),
      );
  }
}
