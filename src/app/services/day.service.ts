import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DayService {
  formatDay(day) {
    const weekday = [];
    weekday[0] = "Воскресенье";
    weekday[1] =  "Понедельник";
    weekday[2] = "Вторник";
    weekday[3] = "Среда";
    weekday[4] = "Четверг";
    weekday[5] = "Пятница";
    weekday[6] = "Суббота"; 
    return weekday[day];
  }
}
