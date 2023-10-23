
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { carnetService } from '../../service/carnet.service';
import { FormGroup, FormBuilder, Validators,  } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-carnet-edit',
  templateUrl: './carnet-edit.component.html',
  styleUrls: ['./carnet-edit.component.css'],
})
export class CarnetEditComponent implements OnInit {
  submitted = false;
  editForm!:FormGroup;

    //radiobox
couvertureList= ["Oui","Non"];
sangList=["A","B","AB","O"];
rhesusList=["Positive","Negative"];
categorieList= ["Gynécologie-obstérique","Echographie","Les maladies du sein","Coelioscopie","Stérilité du couple","ECG"];
  route: any;
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private CarnetService : carnetService ,
    private router: Router,
    private UserService: UserService

  ) {}
  ngOnInit(): void{
    if (!this.UserService.isDocteur()) {
      this.router.navigate(['/accesdenied']); // Redirect to  page
    } else {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getCarnet(id);
    this.editForm = this.fb.group({
      
    nom: [''],
    prenom: [''],
    adresse: [''],
    naissance: [''],
    nationalite: [''],
    Cin: [''],
    niv_inst: [''],
    occupation: [''],
    tel: ['', [Validators.pattern('^[0-9]+$')]],
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
    telM: ['', [ Validators.pattern('^[0-9]+$')]],
    
    });
    }
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }
  getCarnet(id: string | null) {
    this.CarnetService .getCarnet(id).subscribe((data) => {
      this.editForm.setValue({

       nom :data['nom'],

        prenom:data['prenom'],
     
        adresse:data['adresse'],
     
        naissance:data['naissance'],
     
        nationalite:data['nationalite'],
     
        Cin:data['Cin'],
     
        niv_inst:data['niv_inst'],
     
        occupation:data['occupation'],
     
        tel:data['tel'],
     
        couv:data['couv'],
     
        num_c:data['num_c'],
     
        sang:data['sang'],
     
        rhesus:data['rhesus'],
     
        type_allergie:data['type_allergie'],
     
        declaree_allergie:data['declaree_allergie'],
     
        traitement:data['traitement'],
     
        med_tret:data['med_tret'],
     
        age_pub:data['age_pub'],
     
        prob:data['prob'],
     
        maladie:data['maladie'],
     
        maladieF:data['maladieF'],
     
        type_handicap:data['type_handicap'],
     
        declaree_handicap:data['declaree_handicap'],
     
        date_vaccin1:data['date_vaccin1'],
     
        lieu_vaccin1:data['lieu_vaccin1'],
     
        date_vaccin2:data['date_vaccin2'],
     
        lieu_vaccin2:data['lieu_vaccin2'],
     
        date_vaccin3:data['date_vaccin3'],
        lieu_vaccin3:data['lieu_vaccin3'],
     
        date_vaccin4:data['date_vaccin4'],
     
        lieu_vaccin4:data['lieu_vaccin4'],
     
        date_vaccin5:data['date_vaccin5'],
     
        lieu_vaccin5:data['lieu_vaccin5'],
     
        date_rubeole:data['date_rubeole'],
     
        lieu_rubeole:data['lieu_rubeole'],
     
        autre_vaccin:data['autre_vaccin'],
     
        nomM:data['nomM'],
     
        prenomM:data['prenomM'],
     
        telM:data['telM'],
     
    
      });
    });
  }
  updateCarnet() {
    this.editForm = this.fb.group({
   

      nom: [''],
      prenom: '',
 
      adresse: '',
   
      naissance: '',
   
      nationalite: '',
   
      Cin: '',
   
      niv_inst: '',
   
      occupation: '',
   
      tel: ['', [ Validators.pattern('^[0-9]+$')]],
   
      couv: '',
   
      num_c: '',
   
      sang: '',
   
      rhesus: '',
   
      type_allergie: '',
   
      declaree_allergie: '',
   
      traitement: '',
   
      med_tret: '',
   
      age_pub: '',
   
      prob: '',
   
      maladie: '',
   
      maladieF: '',
   
      type_handicap: '',
   
      declaree_handicap: '',
   
      date_vaccin1: '',
   
      lieu_vaccin1: '',
   
      date_vaccin2: '',
   
      lieu_vaccin2: '',
   
      date_vaccin3: '',
      lieu_vaccin3: '',
   
      date_vaccin4: '',
   
      lieu_vaccin4: '',
   
      date_vaccin5: '',
   
      lieu_vaccin5: '',
   
      date_rubeole: '',
   
      lieu_rubeole: '',
   
      autre_vaccin: '',
   
      nomM: '',
   
      prenomM: '',
   
      telM: ['', [ Validators.pattern('^[0-9]+$')]],

  
     
      
    });
  }
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.CarnetService .updateCarnet(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/admin/listP');
            window.alert("Le carnet  est modifié avec succées ");
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    }
    return true;
  }
  
  
}







