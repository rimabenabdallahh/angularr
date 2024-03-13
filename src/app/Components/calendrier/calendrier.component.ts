import { Component, OnInit} from '@angular/core';
import { SchedulerEvent} from "@progress/kendo-angular-scheduler";
import { sampleData} from "./events";
import { CalendrierService } from 'src/app/services/calendrier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { IntlService, CldrIntlService } from "@progress/kendo-angular-intl";
import '@progress/kendo-date-math/tz/Africa/Tunis';
import localeFrTN from '@angular/common/locales/fr-TN';


declare var FullCalendar: any;
//registerLocaleData(fr);
export interface Event {
  Title: String;
  Description: String;
  Start: Date;
  End: Date;
}

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit{
  
  selectedEvent :any
  opened = false
  eventForm !:FormGroup
  Events: SchedulerEvent[] =[]
  public selectedDate: Date = new Date();
  public events: SchedulerEvent[] = sampleData;
  currentYear = new Date().getFullYear();
  parseAdjust = (eventDate: string): Date => {
      const date = new Date(eventDate);
      date.setFullYear(this.currentYear);
      return date;
  };

   randomInt = (min:any, max:any): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
   displayDate = new Date(this.currentYear, 5, 24);
  
  
  constructor( private api :CalendrierService ,
               private fb :FormBuilder,
               private intl: IntlService,){}
  
  getEvent(){
    this.api.GetAppointmentsList().subscribe({
      next: (res) => {
        this.Events =res.map((dataItem:any, index: number) =>(
           <SchedulerEvent> {
            id: index+1,
            start: this.parseAdjust(dataItem.start),
            startTimezone: dataItem.startTimezone,
            end: this.parseAdjust(dataItem.end),
           endTimezone: dataItem.endTimezone,
           isAllDay: false,
          title: dataItem.titre,
        description: dataItem.description,
        recurrenceRule: "",
        recurrenceId: dataItem!.idf,
        recurrenceException: dataItem.RecurrenceException,
        roomId: dataItem.RoomID,
        ownerID: index+1,
      
    }    
      )
      );
      console.log(this.Events)
      },
      error: (err) => {
      },
    });
  }
  public close(): void { this.opened = false; }
  public open(data:any): void {
    this.selectedEvent=data
    this.opened = true
   }
  
  ngOnInit() {
    registerLocaleData(localeFrTN);
    console.log((this.intl));
    (<CldrIntlService>this.intl).localeId = 'fr-TN';
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      start: ['', Validators.required],
      end: ['', Validators.required],
      userId : ['']})
    this.getEvent() 
  }

}



