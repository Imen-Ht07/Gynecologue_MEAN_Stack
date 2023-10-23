import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { Appointment } from '../../model/appointment';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  appointmentsList: Appointment[] = [];
  newAppointment: Appointment = new Appointment();

  constructor(
    private appointmentService: AppointmentService,
    private UserService: UserService
  ) {}
  ngOnInit(): void {
    if (!this.UserService.isDocteurOrSecretaire()) {
      this.UserService.logout(); // Redirect to login page
    } else {
      this.getAppointments();
    }
  }
  getAppointments(): void {
    this.appointmentService.getAppointments().subscribe(
      appointments => {
        this.appointmentsList = appointments;
      },
      error => {
        console.error('Failed to get appointments', error);
      }
    );
  }

  deleteAppointment(appointment: Appointment): void {
    this.appointmentService.deleteAppointment(appointment).subscribe(
      () => {
        this.appointmentsList = this.appointmentsList.filter(a => a !== appointment);
      },
      error => {
        console.error('Failed to delete appointment', error);
      }
    );
  }
  async logOut() {
    if (confirm("Do you want to log out?")) {
      await this.UserService.logoutUser()
    }
  }
}
