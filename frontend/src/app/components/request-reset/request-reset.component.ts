import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  
  RequestResetForm!: FormGroup;
  errorMessage!: string;
  successMessage!: any;
  IsvalidForm = true;

  constructor(
    private userService: UserService,
    private router: Router
  ) {

  }


  ngOnInit() {

    this.RequestResetForm = new FormGroup({
      'userName': new FormControl(null, [Validators.required]),
    });
  }


  RequestResetUser(form: any) {
    console.log(form)
    if (form.valid) {
      this.IsvalidForm = true;
      this.userService.requestReset(this.RequestResetForm.value).subscribe(
        data => {
          this.RequestResetForm.reset();
          this.successMessage = "Reset password link send to your email sucessfully.";
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['login']);
          }, 8080);
        },
        err => {

          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
      );
    } else {
      this.IsvalidForm = false;
    }
  }

}
