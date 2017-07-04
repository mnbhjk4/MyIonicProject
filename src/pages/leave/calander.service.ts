import { Injectable } from '@angular/core';

@Injectable()
export class CalanderService {

  constructor() { }

  public genCalanderHtml(date: Date): Array<Array<DayModel>> {
    let monthArray = Array<Array<DayModel>>();
    let currentMonth = date.getMonth();
    date.setDate(1);
    if (date.getDay() != 0) {
      let conunt = 7 - (7 - date.getDay());
      date = new Date(date.setDate(date.getDate() - conunt));
    }
    let firstRow = true;
    let thisMonth = 0;
    for (let d = date; true;) {
      let sDate = new Date(d);
      let eDate = new Date(d.setDate(d.getDate() + 7));
      monthArray.push(this.genWeekDiv(currentMonth, sDate, eDate));

      if (firstRow) {
        firstRow = false;
        thisMonth = d.getMonth();
      } else {
        if (d.getMonth() != thisMonth) {
          break;
        }
      }
      d = eDate;
    }

    return monthArray;
  }

  public genWeekDiv(currentMonth: number, startDate: Date, endDate: Date) {
    let weekArray = Array<DayModel>();
    for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
      let dMonth = d.getMonth();
      let day = new DayModel();
      if (dMonth != currentMonth) {
        day.currentMonth = false;
        day.date = d.getDate();
        day.fullDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      } else {
        day.currentMonth = true;
        day.date = d.getDate();
        day.fullDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      }
      weekArray.push(day);
    }
    return weekArray;
  }

  getWeekNumber(date: Date) {
    let copyDate = new Date(date);
    copyDate.setHours(0, 0, 0, 0);
    copyDate.setDate(copyDate.getDate() -copyDate.getDay());
    let yearStart = new Date(copyDate.getFullYear(), 0, 1);
    var weekNo = Math.ceil((((copyDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNo;
  }

}

export class DayModel {
  date: number;
  fullDate: string;
  currentMonth: boolean = true;
}