import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iattendance } from '../models/attendance';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  attendanceUrl: string = environment.fireBaseUrl + "attendance"

  constructor(
    private _httpservice: HttpClient,
    private _utilityService: UtilityService
  ) { }


  createattendanceinfo(obj: Iattendance): Observable<Iattendance> {
    return this._httpservice.post<Iattendance>(this.attendanceUrl + '.json', obj)
  }

  getattendanceinfo(): Observable<Iattendance[]> {
    return this._httpservice.get<Iattendance[]>(this.attendanceUrl + '/.json')
      .pipe(
        map(res => {
          const arrayattendance = []
          for (const key in res) {
            let obj: Iattendance = {
              ...res[key],
              id: key,
              workHours: this._utilityService.getemployeWorkTime(res[key].inTime, res[key].outTime)
            }
            arrayattendance.unshift(obj)
          }
          return arrayattendance
        })

      )
  }

  updateattendanceInfo(id: string, obj: Iattendance): Observable<Iattendance> {
    return this._httpservice.put<Iattendance>(`${this.attendanceUrl}/${id}/.json`, obj)
  }

  deleteinfo(id: string): Observable<null> {
    return this._httpservice.delete<null>(`${this.attendanceUrl}/${id}/.json`)
  }
}
