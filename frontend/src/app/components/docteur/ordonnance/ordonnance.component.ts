import { Component, OnInit, VERSION } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Ordonnance } from '../../../model/ordonance';
import { OrdonnanceService } from '../../../service/ordonance.service';
import { PatienteService } from 'src/app/service/patiente.service';
import { Patiente } from 'src/app/model/patiente';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css']
})
export class OrdonnanceComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  patient: Patiente = new Patiente();
  ordForm!: FormGroup;
  ordonnance: Ordonnance = new Ordonnance();
  submitted = false;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ordonnanceService: OrdonnanceService,
    private patienteService: PatienteService, 
    private UserService:UserService ,
  ) {}

  ngOnInit(): void {
    if (!this.UserService.isDocteur()) {
      this.router.navigate(['/accesdenied']); // Redirect to  page
    } else {
    const patientId = this.route.snapshot.paramMap.get('id');
    this.patienteService.getById(patientId!).subscribe((patient) => {
      this.patient = patient;
      this.initOrdForm();
    });
  }
}

  initOrdForm() {
    this.ordForm = this.fb.group({
      nom: this.patient.nomP,
      prenom: this.patient.prenomP,
      date: '',
      traitement: ''
    });
  }

  get myForm() {
    return this.ordForm.controls;
  }

  onSubmit() {
    const patientId = this.route.snapshot.paramMap.get('id');
    this.submitted = true;

    if (!this.ordForm.valid) {
      return;
    } else {
      this.ordonnanceService.createOrdonance(patientId!, this.ordForm.value).subscribe(
        (response) => {
          console.log('Ordonnance successfully created!');
          this.router.navigate(['/printord/', response._id]);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  printPage() {
    window.print();
  }
}
