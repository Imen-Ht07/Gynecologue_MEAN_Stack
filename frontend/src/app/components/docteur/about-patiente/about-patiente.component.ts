
import { Patiente } from 'src/app/model/patiente';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { PatienteService } from 'src/app/service/patiente.service';
import { ActivatedRoute,  } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-about-patiente',
  templateUrl: './about-patiente.component.html',
  styleUrls: ['./about-patiente.component.css']
})
export class AboutPatienteComponent {
  patient: Patiente = new Patiente();

    
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private patienteService: PatienteService,
    private UserService:UserService ,
  ) { }
  ngOnInit(): void {
    if (!this.UserService.isDocteur()) {
      this.router.navigate(['/accesdenied']); // Redirect to  page
    } else {
    const patientId = this.route.snapshot.paramMap.get('id');
    this.patienteService.getById(patientId!).subscribe((patient) => {
      this.patient = patient;
    });
  } 
}
  createCarnet(patientId: any) {
    this.router.navigate(['/create-carnet', patientId]);
  }
  createConsultation(patientId: any) {
    this.router.navigate(['/const', patientId]);
  }
  createOrdonance(patientId: any) {
    this.router.navigate(['/ord', patientId]);
  }
  listCarnet(patientId: any) {
    this.router.navigate(['/patient', patientId]);
  }
  async logOut() {
    if (confirm("Do you want to log out?")) {
      await this.UserService.logoutUser()
    }
  }

}
