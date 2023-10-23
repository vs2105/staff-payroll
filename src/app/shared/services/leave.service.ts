import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ileave } from '../models/leave';
import { Observable, map } from 'rxjs';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  leaveUrl = environment.fireBaseUrl + 'leaves'

  constructor(
    private _http: HttpClient,
    private _utilityService: UtilityService
  ) { }

  createLeave(obj: Ileave): Observable<Ileave> {
    return this._http.post<Ileave>(this.leaveUrl + '/.json', obj)
  }

  getAllLeaves(): Observable<Ileave[]> {
    return this._http.get<Array<Ileave>>(this.leaveUrl + '/.json')
      .pipe(
        map(res => {
          let arr = []
          for (let key in res) {
            let obj: Ileave = {
              ...res[key],
              id: key,
              numOfDays: this.getDiffDays(res[key].startDate, res[key].endDate)
            }
            // console.log(obj);
            arr.unshift(obj)
          }
          // console.log(arr);
          return arr
        })
      )
  }

  updateLeave(obj: Ileave, id: string): Observable<Ileave> {
    return this._http.patch<Ileave>(`${this.leaveUrl}/${id}/.json`, obj)
  }

  removeLeave(id: string): Observable<null> {
    return this._http.delete<null>(`${this.leaveUrl}/${id}/.json`)
  }
  private getDiffDays(sDate: any, eDate: any) {
    let startDate = new Date(sDate);
    let endDate = new Date(eDate);

    let Time = endDate.getTime() - startDate.getTime();
    return Time / (1000 * 3600 * 24);

  }

}
