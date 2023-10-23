import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Echographie } from '../../../model/echographie';
import { EchographieService } from '../../../service/echographie.service';
import { PatienteService } from 'src/app/service/patiente.service';
import { Patiente } from 'src/app/model/patiente';
import { UserService } from 'src/app/service/user.service';
import * as cornerstone from 'cornerstone-core';
import * as dicomParser from 'dicom-parser';
import { parseDicom } from 'dicom-parser';


@Component({
selector: 'app-add-eco',
templateUrl: './add-eco.component.html',
styleUrls: ['./add-eco.component.css']
})
export class AddEcoComponent implements OnInit {
dicom: File | undefined = undefined;
eco!: Echographie[];
echo: any = [];
ecoForm!: FormGroup;
selectedEco: Echographie | undefined = undefined;
isEditMode: boolean = false;
patient: Patiente = new Patiente();
ecoItem: any;

constructor(
private router: Router, 
private ecoService: EchographieService,
private patienteService: PatienteService,
private route: ActivatedRoute,
private userService: UserService,
private UserService:UserService ,
) {}

ngOnInit(): void {
  if (!this.UserService.isDocteur()) {
    this.router.navigate(['/accesdenied']); // Redirect to  page
} else {
const patientId = this.route.snapshot.paramMap.get('id');
this.patienteService.getById(patientId!).subscribe((patient) => {
this.patient = patient;
this.mainForm(patientId!);
this.getAllEco(patientId!);
});
}
}

mainForm(_id: string) {
this.ecoForm = new FormGroup({
title: new FormControl('', Validators.required),
description: new FormControl('', Validators.required),
content: new FormControl('', Validators.required),
dicom: new FormControl('')
});
}

getAllEco(patientId: string) {
this.ecoService.getAllEco(patientId).subscribe(
(res: Echographie[]) => {
this.eco = res;
},
(err) => console.error(err)
);
}


onFileSelected(dicom: any ): void {
if (dicom.target.files && dicom.target.files.length) {
 this.dicom = dicom.target.files[0];
console.log(this.dicom);
}
}

onSubmit() {
const eco = this.ecoForm.value;
const patientId = this.route.snapshot.paramMap.get('id');
if (this.dicom) {
this.ecoService.createEco(eco, patientId!, this.dicom).subscribe(
(res: Echographie) => {
this.eco.unshift(res);
this.ecoForm.reset();
this.dicom = undefined;
window.alert("L'echographie est ajoutée avec succées ");

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