import { Component, OnInit } from '@angular/core';
import { carnetService } from './../../service/carnet.service';
import {  FormBuilder} from '@angular/forms';
import { Carnet } from 'src/app/model/carnet';
import { PatienteService } from 'src/app/service/patiente.service';
import { Patiente } from 'src/app/model/patiente';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-pat-carnet',
  templateUrl: './pat-carnet.component.html',
  styleUrls: ['./pat-carnet.component.css']
})
export class PatCarnetComponent implements OnInit {
  carnets!:Carnet;
  Carnet:any = [];
  patient: Patiente = new Patiente();

  //checkbox
maladie = this.fb.group({
  Diabéte: false,
  Cardiopathie: false,
  Insuffisance_rénale_chronique: false,
  Asthme: false,
  Anémie:false,
  Hépatite_C:false,
  Hépatite_B: false,
});
  constructor(public fb: FormBuilder,
    private CarnetService: carnetService,
    private patienteService: PatienteService,
    private route: ActivatedRoute,
    private UserService: UserService
    ) { 
   
  }
  
 
  ngOnInit(): void{
    if (!this.patienteService.isPatient()) {
      this.UserService.logout(); // Redirect to login page
    } else {
    const patientId = this.route.snapshot.paramMap.get('id');
    this.patienteService.getById(patientId!).subscribe((patient) => {
      this.patient = patient;
      this.readCarnet(patientId!);
    });
  } 
}

  readCarnet(patientId: string) {
    this.CarnetService.getCarnets(patientId).subscribe((data) => {
      this.Carnet = data;
    });
  }


  
}