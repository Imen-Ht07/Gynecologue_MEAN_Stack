import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { PatienteService } from 'src/app/service/patiente.service';
import { Patiente } from 'src/app/model/patiente';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  updatePasswordForm!: FormGroup;
  errorMsg!: string;
  newPassword: string = '';
  confirmNewPassword: string = '';
  user!: Patiente ;
  id!:String
  constructor(
    private PatienteService: PatienteService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder ) {}

    getByID(id:any): void {
      this.PatienteService.getById(id)
        .subscribe(
          data => {
            this.user = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }
    
  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.getByID(this.id);
    this.updatePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required]
    }, { validator: this.matchPassword });
  }
  matchPassword(group: FormGroup) {
    let newPassword = group.get('newPassword')?.value;
    let confirmNewPassword = group.get('confirmNewPassword')?.value;

    if (newPassword !== confirmNewPassword) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }

  onSubmit() {
    this.PatienteService.updatePassword(
      this.user._id,
      this.updatePasswordForm.value.oldPassword,
      this.updatePasswordForm.value.newPassword
    ).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
        this.errorMsg = error.error.msg;
      }
    );
  }
}

