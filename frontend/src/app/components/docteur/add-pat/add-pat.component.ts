import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {PatienteService  } from '../../../service/patiente.service';
import {FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import{Patiente} from '../../../model/patiente'
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-pat',
  templateUrl: './add-pat.component.html',
  styleUrls: ['./add-pat.component.css']
})
export class AddPatComponent {
  hide = true;
  user!: Patiente;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  stringPattern = "^[A-Za-z]+([\\ A-Za-z]+)*";
  pwdPattern = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{6,12}$";
  emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  telPattern = "[0-9]{8}$"; 
  constructor(public formBuilder: FormBuilder, private P:PatienteService, private router: Router, private UserService: UserService) { 
  this.  registerForm = this.formBuilder.group({
    nomP: new FormControl('', [Validators.required, Validators.pattern(this.stringPattern)]),
    prenomP: new FormControl('', [Validators.required, Validators.pattern(this.stringPattern)]),
    tel: new FormControl('', [Validators.required, Validators.pattern(this.telPattern)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    naissance: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.pwdPattern)]),
  })
}   
get f() { return this.registerForm.controls; }  
ngOnInit(): void {
  if (!this.UserService.isDocteurOrSecretaire()) {
    this.UserService.logout(); // Redirect to login page
   return;
  }
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    window.alert("La patiente est ajoutée avec succées ");
    this.P.saveP(this.registerForm.value)        
    .subscribe(
      res => {             
           
        this.router.navigate(['/admin/listP']);
      },
      err => console.log(err)
    )
     } }