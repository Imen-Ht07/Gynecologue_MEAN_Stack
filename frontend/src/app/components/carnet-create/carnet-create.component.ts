import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatienteService } from 'src/app/service/patiente.service';
import { Patiente } from 'src/app/model/patiente';
import { carnetService } from 'src/app/service/carnet.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-carnet-create',
  templateUrl: './carnet-create.component.html',
  styleUrls: ['./carnet-create.component.css'],
})
export class CarnetCreateComponent implements OnInit {
  patient: Patiente = new Patiente();
  submitted = false;
  carnetForm!: FormGroup;
  // radiobox
  couvertureList = ['Oui', 'Non'];
  sangList = ['A', 'B', 'AB', 'O'];
  rhesusList = ['Positive', 'Negative'];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private carnetService: carnetService,
    private patienteService: PatienteService,
    private route: ActivatedRoute, 
    private UserService: UserService
  ) {}


  ngOnInit(): void{
    if (!this.UserService.isDocteur()) {
      this.router.navigate(['/accesdenied']); // Redirect to  page
    } else {
    const patientId = this.route.snapshot.paramMap.get('id');
    this.patienteService.getById(patientId!).subscribe((patient) => {
      this.patient = patient;
      this.mainForm(patientId!);
    });
  }
}

  mainForm(_id: string) {
    this.carnetForm = this.fb.group({
      nom: [this.patient.nomP],
      prenom: [this.patient.prenomP],
      adresse: ['', Validators.required],
      naissance: [this.patient.naissance],
      nationalite: ['', Validators.required],
      Cin: ['', Validators.required],
      niv_inst: [''],
      occupation: [''],
      tel: [this.patient.tel],
      couv: [''],
      num_c: [''],
      sang: [''],
      rhesus: [''],
      type_allergie: [''],
      declaree_allergie: [''],
      traitement: [''],
      med_tret: [''],
      age_pub: [''],
      prob: [''],
      maladie: [''],
      maladieF: [''],
      type_handicap: [''],
      declaree_handicap: [''],
      date_vaccin1: [''],
      lieu_vaccin1: [''],
      date_vaccin2: [''],
      lieu_vaccin2: [''],
      date_vaccin3: [''],
      lieu_vaccin3: [''],
      date_vaccin4: [''],
      lieu_vaccin4: [''],
      date_vaccin5: [''],
      lieu_vaccin5: [''],
      date_rubeole: [''],
      lieu_rubeole: [''],
      autre_vaccin: [''],
      nomM: [''],
      prenomM: [''],
      telM: [''],
    });
  }
  // Getter to access form control
  get myForm() {
    return this.carnetForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.carnetForm.valid) {
      return false;
    } else {
      const patientId = this.route.snapshot.paramMap.get('id');
      return this.carnetService.createCarnet(patientId!, this.carnetForm.value).subscribe({
        complete: () => {
          window.alert("Le carnet  est ajoutée avec succées ");
          this.ngZone.run(() => this.router.navigateByUrl('/admin/listP'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
  async logOut() {
    if (confirm("Do you want to log out?")) {
      await this.UserService.logoutUser()
    }
  }
}
