import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard2Component } from 'src/app/Components/Dhashboards/dashboard2/dashboard2.component';
import { DossierListComponent } from 'src/app/Components/Dossier/dossiers/dossier-list/dossier-list.component';
import { DashboardTasksComponent } from 'src/app/Components/Dossier/manageTasks/dashboard-tasks/dashboard-tasks.component';
import { HomeComponent } from 'src/app/Components/Home/home.component';
import { CalendrierComponent } from 'src/app/Components/calendrier/calendrier.component';
import { ParticipantComponent } from 'src/app/Components/Dossier/dossiers/participant/participant.component';
import { EvaluationComponent } from 'src/app/Components/evaluation/evaluation/evaluation.component';
import { ProfileComponent } from 'src/app/Components/profile/profile.component';
import { CourComponent } from 'src/app/Components/cour/cour.component';
import { WelcomingComponent } from 'src/app/Components/Meet/welcoming/welcoming.component';
import { SessionComponent } from 'src/app/Components/Meet/welcoming/session/session.component';
import { ChatComponent } from 'src/app/Components/chat/chat.component';
import { ContactUsComponent } from 'src/app/Components/contact-us/contact-us.component';
import { AttestationComponent } from 'src/app/Components/attestation/attestation.component';
import { FactureComponent } from 'src/app/Components/facture/facture.component';


const routes: Routes = [
   
   {path:'',component:Dashboard2Component,
   children:[
    { path: '',   redirectTo: 'Home', pathMatch: 'full' },
    {path:'Home',component: HomeComponent},
    {path:'GestionFormation',component: DossierListComponent},
    { path: 'GestionUtilisateur',component :DashboardTasksComponent},
    {path:'Calendrier',component: CalendrierComponent},
    {path:'Participant',component: ParticipantComponent},
    {path:'Eval',component: EvaluationComponent},
    {path:'Profile',component: ProfileComponent},
    {path:'Cours',component: CourComponent},
    {path:'Meet',component:  WelcomingComponent },
    {path:'Salle/:roomName',component:  SessionComponent },
    {path:'Chat',component:  ChatComponent },
    {path:"ContactUs",component:ContactUsComponent},
    {path:"Attestation",component:AttestationComponent},
    {path:"Facture",component:FactureComponent},
    {path :'',component:DashboardTasksComponent}
    //{ path: 'Manage',loadChildren:()=>import('../managetask/managetask.module').then((m)=>m.ManagetaskModule)},
   ]},

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
