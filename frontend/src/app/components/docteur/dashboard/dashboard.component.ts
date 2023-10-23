import { Component, OnInit } from '@angular/core';
import { SecretaireService } from 'src/app/service/secretaire.service';
import { PatienteService } from 'src/app/service/patiente.service';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';
import { Patiente } from 'src/app/model/patiente';
import { AppointmentService } from 'src/app/service/appointment.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  nbrP : any;
  nbrM : any;
  nbrA : any;
  nbrAr : any;
  patientes: Patiente[]=[];
  constructor(private SecretaireService:SecretaireService,
    private PatienteService:PatienteService,
    private appointmentService:AppointmentService,
    private UserService:UserService ,
    private messageService:MessageService,){}
    user!:any;
    ngOnInit(): void {
      if (!this.UserService.isDocteurOrSecretaire()) {
        this.UserService.logout(); // Redirect to login page
      } else {
        this.getNbP();
        this.getNbM();
        this.getNbA();
        this.getNbAr();
        document.querySelector("#content > div.topbar");
        this.user = this.UserService.getCurrentUser().user;
      }
    }
      getNbP(){
        this.PatienteService.getNbP().subscribe((data)=>
        {this.nbrP =data, console.log("Nombre de patiente "+this.nbrP)});
      }
      getNbA(){
        this.appointmentService.getA().subscribe((data)=>
        {this.nbrA =data, console.log("Nombre de patiente "+this.nbrA)});
      }
      getNbM(){
        this.messageService.getM().subscribe((data)=>
        {this.nbrM =data, console.log("Nombre de message "+this.nbrM)});
      }
      getNbAr(){
        this.messageService.getM().subscribe((data)=>
        {this.nbrAr =data, console.log("Nombre d'article "+this.nbrAr)});
      }
  
     
    
      async logOut() {
        if (confirm("Do you want to log out?")) {
          await this.UserService.logoutUser()
        }
      }
}

