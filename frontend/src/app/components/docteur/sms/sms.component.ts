import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SmsService } from '../../../service/sms.service';
import { AppointmentService } from '../../../service/appointment.service';
import { Appointment } from '../../../model/appointment';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit {
  appointment: Appointment = new Appointment();
  submitted = false;
  SmsForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private smsService: SmsService,
    private appointmentService: AppointmentService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.userService.isDocteurOrSecretaire()) {
      this.userService.logout(); // Redirect to login page
    } else {
    const appointmentId = this.route.snapshot.paramMap.get('id');
    this.appointmentService.getById(appointmentId!).subscribe((appointment) => {
      this.appointment = appointment;
      this.createForm();
    });
  }
  }
  createForm() {
    this.SmsForm = this.fb.group({
      nom: [this.appointment.nom],
      prenom: [this.appointment.prenom],
      numt: [this.appointment.numt],
      messageBody: ['', Validators.required]
    });
  }

  get f() {
    return this.SmsForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.SmsForm.invalid) {
      return;
    }

    this.router.navigate(['/admin/listapp']);

    const appointmentId = this.route.snapshot.paramMap.get('id');
    const data = this.SmsForm.value;

    this.smsService.Send(appointmentId!, data).subscribe(
      () => {
        console.log('SMS sent successfully.');
      },
      (error) => {
        console.error('Failed to send SMS:', error);
      }
    );
  }

  async logOut() {
    if (confirm("Do you want to log out?")) {
      await this.userService.logoutUser();
    }
  }
}
