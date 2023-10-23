import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Echographie } from '../../../model/echographie';
import { EchographieService} from '../../../service/echographie.service';
import { PatienteService } from 'src/app/service/patiente.service';
import { Patiente } from 'src/app/model/patiente';
import { UserService } from 'src/app/service/user.service';

//cornerstone
import * as cornerstone from 'cornerstone-core';
import * as dicomParser from 'dicom-parser';
import { parseDicom } from 'dicom-parser';




@Component({
  selector: 'app-eco-list',
  templateUrl: './eco-list.component.html',
  styleUrls: ['./eco-list.component.css']
})
export class EcoListComponent {

  dicom: File | undefined = undefined;
  eco!: Echographie[];
  echo:any =[]; 
  ecoForm!: FormGroup;
  selectedEco: Echographie| undefined = undefined;
  isEditMode: boolean = false;
  patient: Patiente = new Patiente();
  ecoItem: any
  constructor(private ecoService: EchographieService,   
    private patienteService: PatienteService,
    private route: ActivatedRoute, 
    private router: Router, 
    private UserService: UserService) { }
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
    });}
getAllEco(patientId: string) {
    this.ecoService.getAllEco(patientId).subscribe(
      (res: Echographie[]) => {
        this.eco = res;
      },
      (err) => console.error(err)
    );
  }
  
  loadDicomImage(dicomFile: File, ecoItem: Echographie): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const byteArray = new Uint8Array(arrayBuffer);
      const dataSet = parseDicom(byteArray);
  
      // Get the ImageID from the DICOM data
      const imageId = dataSet.string('x0020000d') || dataSet.string('x00080018');
  
      const canvasId = 'dicomCanvas-' + ecoItem._id;
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      cornerstone.enable(canvas);
  
      cornerstone.loadAndCacheImage(imageId!).then(image => {
        cornerstone.displayImage(canvas, image);
      });
    };
    reader.readAsArrayBuffer(dicomFile);
  }
  onFileSelected(event: Event, ecoItem: Echographie): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const dicomFile = input.files[0];
      this.loadDicomImage(dicomFile, ecoItem);
    }
  }
onSubmit() {
    const eco = this.ecoForm.value;
    if (this.isEditMode && this.selectedEco && this.selectedEco._id && this.dicom) {
      this.ecoService.updateEco(this.selectedEco._id, eco, this.dicom).subscribe(
        (res: Echographie) => {
          const index = this.eco.findIndex(a => a._id === res._id);
          this.eco[index] = res;
          this.ecoForm.reset();
          this.dicom= undefined;
          this.selectedEco = undefined;
          this.isEditMode = false;
        },
        (err) => console.error(err)
      );
    } else {
     return
    }
  }
  

  onEdit(eco: Echographie) {
    this.ecoForm.patchValue({
      title: eco.title,
      description: eco.description,
      content: eco.content
    });
    this.selectedEco = eco;
    this.isEditMode = true;
  }
  
  onCancel() {
    this.ecoForm.reset();
    this.dicom = undefined;
    this.selectedEco = undefined;
    this.isEditMode = false;
  }


  onDelete(eco: Echographie) {
    if (eco && eco._id && confirm(`Are you sure you want to delete the eco "${eco.title}"?`)) {
      this.ecoService.deleteEco(eco._id).subscribe(
        () => {
          const index = this.eco.findIndex(a => a._id === eco._id);
          this.eco.splice(index, 1);
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

