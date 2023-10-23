import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any;
  error: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.userService.getUserProfile().subscribe(
      (response) => {
        this.userProfile = response;
      },
      (error) => {
        this.error = error;
      }
    );
  }
}
