import { Component, OnInit } from '@angular/core';
import { ConsultationService } from './../../service/consultation.service';
import { FormBuilder } from '@angular/forms';
import { Consultation } from 'src/app/model/consultation';
import { PatienteService } from 'src/app/service/patiente.service';
import { Patiente } from 'src/app/model/patiente';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-consultation-list',
  templateUrl: './consultation-list.component.html',
  styleUrls: ['./consultation-list.component.css']
})
export class ConsultationListComponent implements OnInit {

  consultations: Consultation[] = [];
  patient: Patiente = new Patiente();

  constructor(
    public fb: FormBuilder,
    private consultationService: ConsultationService,
    private patienteService: PatienteService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.userService.isDocteur()) {
      this.userService.logout(); // Redirect to login page
    } else {
      const patientId = this.route.snapshot.paramMap.get('id');
      this.patienteService.getById(patientId!).subscribe((patient) => {
        this.patient = patient;
        this.readConsultation(patientId!);
      });
    }
  }

  readConsultation(patientId: string) {
    this.consultationService.getConsultations(patientId).subscribe((data) => {
      this.consultations = Object.values(data); // Convert the object to an array
    });
  }

  onDelete(consultation: Consultation) {
    if (consultation && consultation._id && confirm(`Souhaitez-vous confirmer la suppression de carnet de "${consultation.timing}"?`)) {
      this.consultationService.deleteConsultation(consultation._id).subscribe(
        () => {
          this.consultations = this.consultations.filter((c) => c._id !== consultation._id);
        },
        (err) => console.error(err)
      );
    }
  }
  async logOut() {
    if (confirm("Do you want to log out?")) {
      await this.userService.logoutUser()
    }
  }
  isPDF(url: string): boolean {
    return url.toLowerCase().endsWith('.pdf');
  }
}
