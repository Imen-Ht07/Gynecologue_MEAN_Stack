import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarnetCreateComponent } from './components/carnet-create/carnet-create.component';
import { CarnetListComponent } from './components/carnet-list/carnet-list.component';
import { CarnetEditComponent } from './components/carnet-edit/carnet-edit.component';
import { HomeComponent } from './components/home/home.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { ServiceComponent } from './components/service/service.component';
import { BlogComponent } from './components/blog/blog.component';
import { LoginComponent } from './components/login/login.component';
import { AddPatComponent } from './components/docteur/add-pat/add-pat.component';
import { DashboardComponent } from './components/docteur/dashboard/dashboard.component';
import { ListPatientesComponent } from './components/docteur/list-patientes/list-patientes.component';
import { OrdonnanceComponent } from './components/docteur/ordonnance/ordonnance.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { RequestResetComponent } from './components/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/response-reset/response-reset.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { ReclamationListComponent } from './components/reclamation-list/reclamation-list.component';
import { ConsultationComponent } from './components/consultation/consultation.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ConsultationListComponent } from './components/consultation-list/consultation-list.component';
import { EditConsultationComponent } from './components/edit-consultation/edit-consultation.component';
import { AddEcoComponent } from './components/docteur/add-eco/add-eco.component';
import { SmsComponent } from './components/docteur/sms/sms.component';
import { AboutPatienteComponent } from './components/docteur/about-patiente/about-patiente.component';
import { CalenderComponent } from './components/calender/calender.component';
import { OrdoListComponent } from './components/ordo-list/ordo-list.component';
import { PrintOrdComponent } from './components/print-ord/print-ord.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DeniedComponent } from './components/denied/denied.component';
import { EcoListComponent } from './components/docteur/eco-list/eco-list.component';

import { PatCarnetComponent } from './components/pat-carnet/pat-carnet.component';




const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'create-carnet/:id', component: CarnetCreateComponent },
  { path: 'edit-carnet/:id', component: CarnetEditComponent },
  { path: 'patient/:id', component: CarnetListComponent }, 
  { path: 'home' , component: HomeComponent }, 
  { path: 'appointment' , component: AppointmentComponent  },
  { path: 'accesdenied' , component: DeniedComponent  },
  { path: 'admin/listapp' , component: AppointmentListComponent  },  
  { path: 'contact' , component: ContactComponent  }, 
  { path: 'about' , component: AboutComponent  }, 
  { path: 'service' , component: ServiceComponent  }, 
  { path: 'blog' , component: BlogComponent  },
  { path: 'login', component: LoginComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/listP', component: ListPatientesComponent },
  { path: 'ord/:id', component: OrdonnanceComponent},
  {path: 'admin/patiente', component:AddPatComponent},
  {path:'admin/listR', component:ReclamationListComponent  },
  {path:'const/:id', component:ConsultationComponent  },
  {path:'eco/:id', component:AddEcoComponent },
  {path:'sms/:id', component:SmsComponent },
  {path: 'aboutpatient/:id', component:  AboutPatienteComponent },
  //psw
  {path:'request', component:RequestResetComponent },
  {path:'response/:resettoken', component:ResponseResetComponent},
  {path:'changepass/:id', component: ChangePassComponent },
  {path:'carnet/:id', component:ConsultationComponent },
  {path:'const-list/:id', component:ConsultationListComponent },
  {path:'const-edit/:id', component:EditConsultationComponent },
  {path:'calender', component: CalenderComponent },
  {path:'ordlist/:id', component: OrdoListComponent },
  {path:'printord/:id', component: PrintOrdComponent},
  {path:'ecolist/:id', component: EcoListComponent},
  {path:'patientcar/:id', component: PatCarnetComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }  