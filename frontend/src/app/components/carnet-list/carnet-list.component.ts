import { Component, OnInit } from '@angular/core';
import { carnetService } from './../../service/carnet.service';
import {  FormBuilder} from '@angular/forms';
import { Carnet } from 'src/app/model/carnet';
import { PatienteService } from 'src/app/service/patiente.service';
import { Patiente } from 'src/app/model/patiente';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-carnet-list',
  templateUrl: './carnet-list.component.html',
  styleUrls: ['./carnet-list.component.css']
})
export class CarnetListComponent implements OnInit {
  
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
    if (!this.UserService.isDocteur()) {
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

  onDelete(carnet: Carnet) {
    if (carnet && carnet._id && confirm(`Souhaitez-vous confirmer la suppression de carnet de"${carnet.nom}"?`)) {
      this.CarnetService.deleteCarnet(carnet._id).subscribe(
        () => {
          const index = this.carnets.findIndex((a: { _id: string | undefined; }) => a._id === carnet._id);
          this.carnets.splice(index, 1);
        },
        (err) => console.error(err)
      );
    }
  }
  async logOut() {
    if (confirm("Do you want to log out?")) {
      await this.UserService.logoutUser()
    }
  }
  
}