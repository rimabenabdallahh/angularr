import { NgModule,LOCALE_ID } from '@angular/core';
import { HomeComponent } from '../../Components/Home/home.component';
import {DashboardRoutingModule}from './dashboard-routing.module'
import { DashboardTasksComponent } from 'src/app/Components/Dossier/manageTasks/dashboard-tasks/dashboard-tasks.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { IconsModule } from '@progress/kendo-angular-icons';
import { PopupModule } from '@progress/kendo-angular-popup';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { LabelModule } from '@progress/kendo-angular-label';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { CommonModule } from '@angular/common';
import { PagerModule } from '@progress/kendo-angular-pager';
import { DialogModule, DialogsModule } from '@progress/kendo-angular-dialog';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContextMenuModule, MenuModule } from '@progress/kendo-angular-menu';
import { DossierListComponent } from 'src/app/Components/Dossier/dossiers/dossier-list/dossier-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { tabUserComponent } from "src/app/Components/Dossier/manageTasks/dashboard-tasks/tab-user/tab-user.component";
import { CalendrierComponent } from 'src/app/Components/calendrier/calendrier.component';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { UserDetailsComponent } from 'src/app/Components/Dossier/manageTasks/dashboard-tasks/tab-user/user-details/user-details.component';
import { DetailFormationComponent } from 'src/app/Components/Dossier/dossiers/dossier-list/detail-formation/detail-formation.component';
import { ParticipantComponent } from 'src/app/Components/Dossier/dossiers/participant/participant.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { MeetComponent } from 'src/app/Components/Meet/meet/meet.component';
import { EvaluationComponent } from 'src/app/Components/evaluation/evaluation/evaluation.component';
import { TabEvalComponent } from 'src/app/Components/evaluation/evaluation/tab-eval/tab-eval.component';
import { GridEvalComponent } from 'src/app/Components/evaluation/evaluation/grid-eval/grid-eval.component';
import { WelcomingComponent } from 'src/app/Components/Meet/welcoming/welcoming.component';
import { SessionComponent } from 'src/app/Components/Meet/welcoming/session/session.component';
import { StreamChatModule, StreamI18nService } from 'stream-chat-angular';
import { EmailComponent } from 'src/app/Components/Dossier/manageTasks/dashboard-tasks/email/email.component';
import { ContactUsComponent } from 'src/app/Components/contact-us/contact-us.component';
import { IntlModule } from '@progress/kendo-angular-intl';
import "@progress/kendo-angular-intl/locales/fr/all";
import localeFrTN from '@angular/common/locales/fr-TN';
import { registerLocaleData } from '@angular/common';
import { AttestationComponent } from 'src/app/Components/attestation/attestation.component';
import { FactureComponent } from 'src/app/Components/facture/facture.component';
import { FactureDetailsComponent } from 'src/app/Components/facture/facture-details/facture-details.component';
registerLocaleData(localeFrTN);



@NgModule({
  declarations: [
   
    HomeComponent,
    DashboardTasksComponent,
    DossierListComponent,
    DetailFormationComponent,
    tabUserComponent,
    CalendrierComponent,
    ParticipantComponent,
    MeetComponent,
    EvaluationComponent,
    TabEvalComponent,
    GridEvalComponent,
    WelcomingComponent,
    SessionComponent,
    EmailComponent,
    ContactUsComponent,
    AttestationComponent,
    FactureComponent,
    FactureDetailsComponent
    
    
    

 ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ButtonsModule,
    NavigationModule,
    InputsModule,
    IconsModule,
    PopupModule,
    LayoutModule,
    IndicatorsModule,
    TreeViewModule,
    FormsModule,
    GridModule,
    ListViewModule,
    LabelModule ,
    ReactiveFormsModule,
    DateInputsModule,
    PagerModule,
    DialogModule,
    DialogsModule,
    HttpClientModule,
    DragDropModule,
    MenuModule,
    ContextMenuModule,
    MatGridListModule,
    SchedulerModule,
    DropDownsModule,
    StreamChatModule,
    IntlModule,
  
    


  ],
  entryComponents:[UserDetailsComponent],
  providers: [{
    provide: LOCALE_ID,
    useValue: "fr-TN",
  }]
  
  
})
export class DashbordModule { }
