import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userProfile: any;
  role: string = '';
  userName: string = '';
  error: string = '';
  constructor(
     private userService: UserService){}

    ngOnInit(): void {
      this.getUserProfile();
    }
    
  async logOut() {
    if (confirm("Do you want to log out?")) {
      await this.userService.logoutUser()
    }
  }

  getUserProfile(): void {
    this.userService.getUserProfile().subscribe(
      (response) => {
        this.userProfile = response;
        this.role = this.userProfile.role; 
        this.userName = this.userProfile.userName; 
      },
      (error) => {
        this.error = error;
      }
    );
  }
  isPatient(): boolean {
    return this.role === 'patiente';
  }
}
