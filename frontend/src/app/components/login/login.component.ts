import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { Patiente } from 'src/app/model/patiente';
import { Secretaire } from 'src/app/model/secretaire';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  user!: User;
  secretaire!: Secretaire;
  patiente!: Patiente;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.login(this.loginForm.value).subscribe(
      data => {
        if (data === null) {
          alert('Username or password is wrong');
        } else if (!data.token) {
          alert('Password is incorrect');
        } else {
          console.log('Login successful');
          console.log('Data.user.role:', data.user.role);
          const role = data.user.role;
          switch (role) {
            case 'docteur':
              this.router.navigate(['admin/dashboard']);
              break;
            case 'patiente':
              this.router.navigate(['/home']);
              break;
            case 'secretaire':
              this.router.navigate(['admin/dashboard']);
              break;
            default:
              console.log('Unknown role:', data);
              alert('Unknown user role');
              break;
          }
        }
      },
      err => {
        alert('Login failed');
      }
    );
  }
}
