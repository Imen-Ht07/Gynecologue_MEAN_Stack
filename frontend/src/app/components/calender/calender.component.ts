import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, Calendar, EventInput } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg, EventDragStopArg } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarService } from '../../service/calender.service';
import { Calender } from 'src/app/model/calender';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
})
export class CalenderComponent implements OnInit {
  calendarOptions?: CalendarOptions;
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;
  events: EventInput[] = []; // Array to store all events

  constructor(private calendarService: CalendarService , private UserService: UserService) {}
  ngOnInit(): void {
    if (!this.UserService.isDocteurOrSecretaire()) {
      this.UserService.logout(); // Redirect to login page
    } else {
    this.calendarOptions = {
      plugins: [timeGridPlugin, interactionPlugin],
      editable: true,
      customButtons: {
        myCustomButton: {
          text: 'Custom!',
          click: () => {
            alert('Clicked the custom button!');
          },
        },
      },
      headerToolbar: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'timeGridWeek,timeGridDay',
      },
      initialView: 'timeGridDay',
      slotDuration: '00:30:00',
      slotMinTime: '08:00:00',
      slotMaxTime: '17:00:00',
      businessHours: {
        startTime: '08:00', // Display business hours starting from 8:00 AM
        endTime: '17:00', // Display business hours ending at 5:00 PM
      },
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this),
    };

    // Call a method to fetch all events from the calendar service
    this.fetchAllEvents();
  }
}

  fetchAllEvents() {
    this.calendarService.getEvents().subscribe(
      (response) => {
        this.events = response.map((event) => ({
          id: event._id, // Use the _id property as the event ID
          title: event.title,
          start: event.start,
          end: event.end,
        }));
        // Update the calendar with the fetched events
        this.calendarOptions!.events = this.events;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  handleDateClick(arg: any) {
    const title = prompt('Write your note:');
    if (title) {
      const eventData: Calender = {
        title: title,
        start: arg.dateStr,
        end: arg.dateStr,
      };
      this.calendarService.createEvent(eventData).subscribe(
        (response) => {
          console.log('Event created:', response);
          // Add the newly created event to the calendar
          this.fullcalendar?.getApi().addEvent({
            id: response._id, // Use the _id property as the event ID
            title: response.title,
            start: response.start,
            end: response.end,
          });
        },
        (error) => {
          console.error('Error creating event:', error);
        }
      );
    }
  }

  handleEventClick(arg: any) {
    const eventId = arg.event.id as string; 
    const confirmation = confirm(`Do you want to confirm the deletion of event "${arg.event.title}"?`);
    if (confirmation) {
      this.calendarService.deleteEvent(eventId).subscribe(
        () => {
          // Event deleted successfully
          console.log('Event deleted successfully');
          // Remove the event from the local events array
          this.events = this.events.filter((event) => event.id !== eventId);
          // Update the calendar with the updated events
          this.calendarOptions!.events = this.events;
        },
        (error) => {
          console.error('Error deleting event:', error);
        }
      );
    }
  }
  
  updateEvent(eventId: string, eventData: Calender) {
    this.calendarService.updateEvent(eventId, eventData).subscribe(
      (updatedEvent) => {
        // Update the event in the local events array
        const index = this.events.findIndex((event) => event.id !== eventId); 
        if (index !== -1) {
          this.events[index] = {
            id: updatedEvent._id, 
            title: updatedEvent.title,
            start: updatedEvent.start,
            end: updatedEvent.end,
          };
        }
        // Update the calendar with the updated events
        this.calendarOptions!.events = this.events;
      },
      (error) => {
        console.error('Error updating event:', error);
      }
    );
  }
handleEventDragStop(arg: any) {
  const eventId = arg.event.id as string; 
  const eventData: Calender = {
    title: arg.event.title,
    start: arg.event.start?.toISOString() || '',
    end: arg.event.end?.toISOString() || '',
  };
  this.updateEvent(eventId, eventData);
}
async logOut() {
  if (confirm("Do you want to log out?")) {
    await this.UserService.logoutUser()
  }
}
  
}
