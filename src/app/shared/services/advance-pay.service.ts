import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iadvance } from '../models/advancePay';

@Injectable({
  providedIn: 'root'
})
export class AdvancePayService {

  advancePayUrl = environment.fireBaseUrl + 'advancePay'
  constructor(
    private _http: HttpClient
  ) { }

  addAdvancePay(obj: Iadvance): Observable<Iadvance> {
    return this._http.post<Iadvance>(this.advancePayUrl + '.json', obj)
  }

  getAllAdvance(): Observable<Iadvance[]> {
    return this._http.get<Iadvance[]>(this.advancePayUrl + '.json')
      .pipe(
        map(res => {
          let arr = []

          for (let key in res) {
            let obj: Iadvance = {
              ...res[key],
              id: key
            }
            arr.unshift(obj)
          }
          return arr
        })
      )
  }

  updateAdvance(id: string, obj: Iadvance): Observable<Iadvance> {
    return this._http.patch<Iadvance>(`${this.advancePayUrl}/${id}/.json`, obj)
  }
  deleteAdvance(id: string): Observable<null> {
    return this._http.delete<null>(`${this.advancePayUrl}/${id}/.json`)
  }

  getAllAdvanceAmount(): Observable<any[]> {
    return this._http.get<any[]>(this.advancePayUrl + '.json')
      .pipe(
        map(res => {
          let arr = []

          for (let key in res) {
            let obj = {
              fullName: res[key].empName,
              advance: res[key].amount
            }
            arr.unshift(obj)
          }
          return arr
        })
      )
  }
}
