import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  getDiffDays(sDate: any, eDate: any) {
    let startDate = new Date(sDate);
    let endDate = new Date(eDate);

    let Time = endDate.getTime() - startDate.getTime();
    return Time / (1000 * 3600 * 24);

  }

  getemployeWorkTime(inTime: string, outTIme: string) {
    let [hrIn, minIn] = inTime.split(':')
    // console.log(+hr, +min);
    let [hrOut, minOut] = outTIme.split(':')
    // console.log(+hrO, +mino);
    let workingMin = this.convertHoursAndMinutesToMinutes(+hrOut, +minOut) - this.convertHoursAndMinutesToMinutes(+hrIn, +minIn)
    console.log(workingMin)
    let workingHours = workingMin / 60
    console.log(workingHours)
    return workingHours
    // return this.convertHoursAndMinutesToMinutes(+hrOut, +minOut) - this.convertHoursAndMinutesToMinutes(+hrIn, +minOut)
  }


  convertHoursAndMinutesToMinutes(hours: number, minute: number) {
    // Convert hours to minutes and add them to the minutes
    return (hours * 60) + minute;
  }

}
