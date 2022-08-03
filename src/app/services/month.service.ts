import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonthService {
  formatMonth(month) {
    const months = [];
    months[1] = 'Январь';
    months[2] = 'Февраль';
    months[3] = 'Март';
    months[4] = 'Апрель';
    months[5] = 'Май';
    months[6] = 'Июнь';
    months[7] = 'Июль';
    months[8] = 'Август';
    months[9] = 'Сентябрь';
    months[10] = 'Октябрь';
    months[11] = 'Ноябрь';
    months[12] = 'Декабрь';
    return months[month]
  }
}
