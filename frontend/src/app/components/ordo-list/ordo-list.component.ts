import { Component } from '@angular/core';
import { Ordonnance } from '../../model/ordonance';
import { OrdonnanceService } from '../../service/ordonance.service';
import { PatienteService } from 'src/app/service/patiente.service';
import { Patiente } from 'src/app/model/patiente';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-ordo-list',
  templateUrl: './ordo-list.component.html',
  styleUrls: ['./ordo-list.component.css']
})
export class OrdoListComponent {
  ordonnances: Ordonnance[] = [];
  searchTerm: string = '';
  patient: Patiente = new Patiente();
  Ordonnance:any = [];

  constructor(private ordonnanceService: OrdonnanceService,
     private patienteService: PatienteService,
     private route: ActivatedRoute,
     private UserService : UserService,
    ) {}
  ngOnInit(): void {
    if (!this.UserService.isDocteur()) {
      this.UserService.logout(); // Redirect to login page
    } else {
      const patientId = this.route.snapshot.paramMap.get('id');
      this.patienteService.getById(patientId!).subscribe((patient) => {
        this.patient = patient;
    this.getOrdonnances(patientId!)
   });
  }
  }
  getOrdonnances(patientId: string) {
    this.ordonnanceService.getOrdonnances(patientId).subscribe((data) => {
      this.ordonnances = data;
    });
  }
  
}

