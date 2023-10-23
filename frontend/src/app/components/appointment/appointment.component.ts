import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  newAppointment: any = {};
  errorMessages: string[] = [];
 

  constructor(
    private appointmentService: AppointmentService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addAppointment() {
    this.errorMessages = [];

    if (!this.newAppointment?.nom || !this.newAppointment?.prenom || !this.newAppointment?.email || !this.newAppointment?.numt || !this.newAppointment?.date || !this.newAppointment?.motif) {
      this.errorMessages.push('Veuillez entrer tous les détails du rendez-vous');
      return;
    }

    const selectedDate = new Date(this.newAppointment.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
      this.errorMessages.push('Veuillez choisir une date ultérieure à aujourd\'hui');
      return;
    }

    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0) {
      this.errorMessages.push('Les rendez-vous ne sont pas disponibles le dimanche , Veuillez choisir une autre date.');
      return;
    }

    const appointment = {
      nom: this.newAppointment.nom,
      prenom: this.newAppointment.prenom,
      email: this.newAppointment.email,
      numt: this.newAppointment.numt,
      date: this.newAppointment.date,
      motif: this.newAppointment.motif,
    };

    this.appointmentService.addAppointment(appointment).subscribe(
      (response) => {
        console.log(response);
        // Clear the form after adding appointment successfully
        this.newAppointment = {
          nom: '',
          prenom: '',
          email: '',
          numt: '',
          date: '',
          motif: '',
        };
      },
      (error) => {
        console.error(error);
        this.errorMessages.push('Failed to add appointment');
      }
    );
  }

}
