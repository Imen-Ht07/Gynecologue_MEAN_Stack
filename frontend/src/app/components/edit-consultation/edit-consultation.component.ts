import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultationService } from '../../service/consultation.service';
import { UserService } from '../../service/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-consultation',
  templateUrl: './edit-consultation.component.html',
  styleUrls: ['./edit-consultation.component.css']
})
export class EditConsultationComponent implements OnInit {
  submitted = false;
  editForm!: FormGroup;
  annexe: File | null = null;

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private consultationService: ConsultationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.userService.isDocteurOrSecretaire()) {
      this.userService.logout(); // Redirect to login page
    } else {
      let id = this.actRoute.snapshot.paramMap.get('id');
      this.getConsultation(id);
      this.editForm = this.fb.group({
        timing: ['', Validators.required],
        conclusion: ['', Validators.required],
        annexe: [''],
      });
    }
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getConsultation(id: string | null) {
    this.consultationService.getConsultation(id).subscribe((data) => {
      this.editForm.setValue({
        timing: data['timing'],
        conclusion: data['conclusion'],
        annexe: data['annexe'],
      });
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.annexe = event.target.files[0];
    }
  }

  updateConsultation() {
    if (this.annexe) {
      this.editForm.patchValue({ annexe: this.annexe });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.updateConsultation();
        this.consultationService.updateConsultation(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/admin/listP');
            console.log('Content updated successfully!');
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    }
    return true;
  }

  async logOut() {
    if (confirm('Do you want to log out?')) {
      await this.userService.logoutUser();
    }
  }
}
