import { Component, OnInit } from '@angular/core';
import { PatienteService } from 'src/app/service/patiente.service';
import { Patiente } from 'src/app/model/patiente';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';



@Component({
  selector: 'app-list-patientes',
  templateUrl: './list-patientes.component.html',
  styleUrls: ['./list-patientes.component.css']
})
export class ListPatientesComponent implements OnInit {
  textsearch:any;
  patientes: Patiente[]=[];
  dataSource = new MatTableDataSource<Patiente>(this.patientes);
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  constructor(
    private patienteService: PatienteService,
    private router: Router,
    private UserService:UserService ,

  ) { }
  

  ngOnInit(): void {
    if (!this.UserService.isDocteurOrSecretaire()) {
      this.UserService.logout(); // Redirect to login page
    } else {
    this.getAll();
  }
}

  getAll(searchTerm: string = ''){
    this.patienteService.getP(searchTerm).subscribe((data) =>
    {
      this.patientes = data
      console.log(data);
    } )
  }


  deletepatiente(patienteClicked: Patiente) {
    if(window.confirm('Souhaitez-vous supprimer les données de cette patiente ?')) {
      this.patienteService.deleteP(patienteClicked._id)
        .subscribe(() => {
          this.patientes = this.patientes.filter(tL => tL._id != patienteClicked._id);
        });
    }
  }
  async logOut() {
    if (confirm("Do you want to log out?")) {
      await this.UserService.logoutUser()
    }
  } 

 
  }