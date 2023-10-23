import { Component, OnInit, VERSION } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Ordonnance } from '../../model/ordonance';
import { OrdonnanceService } from '../../service/ordonance.service';
import { Patiente } from 'src/app/model/patiente';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-print-ord',
  templateUrl: './print-ord.component.html',
  styleUrls: ['./print-ord.component.css']
})
export class PrintOrdComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  patient: Patiente = new Patiente();
  ordForm!: FormGroup;
  ordonnance: Ordonnance = new Ordonnance();
  submitted = false;

  constructor(
    public fb: FormBuilder,
    private ordonnanceService: OrdonnanceService,
    private actRoute: ActivatedRoute,
    private UserService : UserService,
  ) {}

  ngOnInit(): void {
    if (!this.UserService.isDocteur()) {
      this.UserService.logout(); // Redirect to login page
    } else {
    this.initOrdForm();
    this.getOrd();
  }
  }
  initOrdForm() {
    this.ordForm = this.fb.group({
      nom: [''],
      prenom: [''],
      date: [''],
      traitement: ['']
    });
  }

  getOrd() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (id) {
      this.ordonnanceService.getOrd(id).subscribe(
        (data) => {
          this.ordonnance = data;
          this.ordForm.patchValue({
            nom: this.ordonnance.nom,
            prenom: this.ordonnance.prenom,
            date: this.ordonnance.date,
            traitement: this.ordonnance.traitement
          });
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
