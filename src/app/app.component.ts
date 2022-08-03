import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { mockEvents } from './mock/mock';
// import { IMonth } from './models/models';
import { DayService } from './services/day.service';
import { MonthService } from './services/month.service';

@Component({ 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent { 
  // events = mockEvents
  isAddDialog = false
  top = 0
  left = 0
  clientWidth
  clientHeight
  today = new Date()
  myForm : FormGroup;
  // calendar: IMonth = {days: [], month: ''}
  calendar = {days: [], month: ''}
  month = new Date().getMonth()

  constructor(private dayService: DayService, private monthService: MonthService) {
    this.clientWidth = document.documentElement.clientWidth
    this.clientHeight = document.documentElement.clientHeight

    let locStor = localStorage.getItem('calendar') 
    if (locStor == null) {
      this.getDays(this.month)
      localStorage.setItem('calendar', JSON.stringify(this.calendar))
    } else {
      this.calendar = JSON.parse(locStor)
    }

    this.myForm = new FormGroup({
      "name": new FormControl("", Validators.required),
      "participants": new FormControl(""),
      "description": new FormControl(""),
  });
  }

  submit(e){
    e.name = this.myForm.value.name
    e.participants = this.myForm.value.participants
    e.description = this.myForm.value.description
    e.status = true
    this.myForm.value.name = ''
    this.myForm.value.participants = ''
    this.myForm.value.description = ''
    this.myForm.reset(this.myForm.value);
    e.isCellDialog = false
    localStorage.removeItem('calendar')
    localStorage.setItem('calendar', JSON.stringify(this.calendar))
  }

  openAddDialog() {
    this.isAddDialog = true
  }

  closeAddDialog() {
    this.isAddDialog = false
  }

  createEvent() {
    alert('Временно не работает')
  }

  searchEvent() {
    alert('Временно не работает')
  }

  closeCellDialog(e) {
    e.isCellDialog = false
    this.top = 0
    this.left = 0
  }

  reloadPage() {
    alert('Временно не работает')
  }

  deleteData(e) {
    e.isCellDialog = false
    e.name = ''
    e.participants = ''
    e.description = ''
    e.status = false

    localStorage.removeItem('calendar')
    localStorage.setItem('calendar', JSON.stringify(this.calendar))
  }

  clickCell(event, e) {
    if(this.left == 0) { 
      if(event.clientX > this.clientWidth / 2) {
        this.left = -340
      } else {
        this.left = 170
      }
    }
    if(this.top == 0) {
      if(event.clientY > this.clientHeight / 2) {
        this.top = -210
      } else {
        this.top = 0
      }
    }
    e.isCellDialog = true
  }

  getDays(month) {
    this.calendar = {days: [], month: ''}
    let firstDay = new Date(2022, month, 1)
    this.generateCalendar(firstDay)
  }

  generateCalendar(firstDay) {
    if(firstDay.getDay() == 1) {
      while(firstDay.getDate() != 2) {
        this.calendar.days.push(
          {
            now: this.isToday(firstDay),
            date: firstDay.getDate(),
            name: '',
            description: '',
            day: this.dayService.formatDay(firstDay.getDay()),
            status: false,
            isCellDialog: false,
            participants: ''
          }
        )
        firstDay.setDate(firstDay.getDate() + 1)
      }
      while(firstDay.getDate() != 1) {
        this.calendar.days.push(
          {
            now: this.isToday(firstDay),
            date: firstDay.getDate(),
            name: '',
            description: '',
            day: this.dayService.formatDay(firstDay.getDay()),
            status: false,
            isCellDialog: false,
            participants: ''
          }
        )
        firstDay.setDate(firstDay.getDate() + 1)
      }
      this.calendar.month = this.monthService.formatMonth(firstDay.getMonth())
    } else {
      firstDay.setDate(firstDay.getDate() - 1)
      this.generateCalendar(firstDay)
    }
    return this.calendar
  }
  
  prevMonth() {
    this.month -= 1
    this.getDays(this.month)
  }

  nextMonth() {
    this.month += 1
    this.getDays(this.month)
  }

  getToday() {
    this.month = new Date().getMonth()
    this.getDays(this.month)
  }

  isToday(day) {
    if (day.getDate() == this.today.getDate() && day.getMonth() == this.today.getMonth()) {
      return true
    } else {
      return false
    }
  }
}
