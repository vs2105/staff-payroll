import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Iemployee } from '../models/employee';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  empUrl: string = `${environment.fireBaseUrl}employee`

  constructor(
    private _http: HttpClient
  ) { }

  addNewEmployee(obj: Iemployee): Observable<Iemployee> {
    return this._http.post<Iemployee>(this.empUrl + '.json', obj)
  }

  getAllEmployee(): Observable<Iemployee[]> {
    return this._http.get<Iemployee[]>(this.empUrl + '.json')
      .pipe(
        map(res => {
          let arr = []
          for (let key in res) {
            // console.log(res[key]);
            let obj: Iemployee = {
              ...res[key],
              id: key
            }
            arr.unshift(obj)
          }
          return arr
        })
      )
  }

  updateEmployee(id: string, obj: Iemployee): Observable<Iemployee> {
    return this._http.patch<Iemployee>(`${this.empUrl}/${id}/.json`, obj)
  }

  deleteEmployee(id: string): Observable<null> {
    return this._http.delete<null>(this.empUrl + '/' + id + '.json')
  }

  getAllEmployeeNames() {
    return this._http.get<Iemployee[]>(this.empUrl + '.json')
      .pipe(
        map(res => {
          let arr = []
          for (let key in res) {
            // console.log(key);
            arr.unshift(res[key].fname + ' ' + res[key].lname)
          }
          // console.log(arr);
          return arr
        }
        )
      )
  }

  getAllEmployeeNamesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('employName')!)
  }
}
