import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, RequiredValidator } from '@angular/forms';
import { PatienteService } from 'src/app/service/patiente.service';
import { Patiente } from 'src/app/model/patiente';
import { ConsultationService } from 'src/app/service/consultation.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
  patient: Patiente = new Patiente();
  submitted = false;
  consultationForm!: FormGroup;
  annexe: File | null = null;

  constructor(
    private fb: FormBuilder,
    private consultationService: ConsultationService,
    private patienteService: PatienteService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (!this.userService.isDocteurOrSecretaire()) {
      this.userService.logout(); // Redirect to login page
    } else {
      const patientId = this.route.snapshot.paramMap.get('id');
      this.patienteService.getById(patientId!).subscribe((patient) => {
        this.patient = patient;
        this.createForm(patientId!);
      });
    }
  }

  createForm(_id: string) {
    this.consultationForm = this.fb.group({
      conclusion: ['', Validators.required],
      timing: ['',  Validators.required],
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.annexe = event.target.files[0];
    }
  }

  // Getter to access form control
  get myForm() {
    return this.consultationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.consultationForm.valid) {
      return false;
    } else {
      const patientId = this.route.snapshot.paramMap.get('id');
      const formData = new FormData();
      formData.append('conclusion', this.consultationForm.value.conclusion);
      formData.append('timing', this.consultationForm.value.timing);
      formData.append('annexe', this.annexe!);

      return this.consultationService
        .createConsultation(patientId!, formData)
        .subscribe({
          complete: () => {
            window.alert("La consultation  est ajoutée avec succées ");
            // Perform the desired action after consultation creation
          },
          error: (e) => {
            console.log(e);
          },
        });
    }
  }

  async logOut() {
    if (confirm("Do you want to log out?")) {
      await this.userService.logoutUser()
    }
  }
}
