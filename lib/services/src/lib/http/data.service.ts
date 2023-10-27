import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../configuration/environment';

@Injectable()
export class DataService {
  private http = inject(HttpClient);

  private get endpointUrl() {
    return `${environment.apiBase}boards`;
  }

  public getBoards(): Observable<any> {
    return this.http.get(this.endpointUrl);
  }

  public postBoards(board: any): Observable<any> {
    return this.http.post(this.endpointUrl, board);
  }

  public deleteTask(task: any) {
    return this.http.put(`${this.endpointUrl}`, task);
  }
}
