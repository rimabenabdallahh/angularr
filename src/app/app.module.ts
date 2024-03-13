import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TextBoxModule } from '@progress/kendo-angular-inputs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './Components/Dhashboards/navbar/navbar.component';
import { LayoutModule } from "@progress/kendo-angular-layout";
import { IndicatorsModule } from "@progress/kendo-angular-indicators";
import { PopupModule } from "@progress/kendo-angular-popup";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { IconsModule } from "@progress/kendo-angular-icons";
import { NavigationModule } from "@progress/kendo-angular-navigation";
import { LogInComponent } from './Components/Login/log-in/log-in.component';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { GridModule} from '@progress/kendo-angular-grid';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { LabelModule } from '@progress/kendo-angular-label';
import { CommonModule } from "@angular/common";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { SideNavComponent } from './Components/Dhashboards/side-nav/side-nav.component';
import { PagerModule } from '@progress/kendo-angular-pager';
import { Dashboard2Component } from 'src/app/Components/Dhashboards/dashboard2/dashboard2.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { UserDetailsComponent } from './Components/Dossier/manageTasks/dashboard-tasks/tab-user/user-details/user-details.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ProfileComponent } from './Components/profile/profile.component';
import { CourComponent } from './Components/cour/cour.component';
import { CourdetailsComponent } from './Components/cour/courdetails/courdetails.component';
import { TranslateModule } from '@ngx-translate/core';
import { StreamChatModule, StreamAutocompleteTextareaModule } from 'stream-chat-angular';
import { ChatComponent } from './Components/chat/chat.component';
import { EmailDetailComponent } from './Components/Dossier/manageTasks/dashboard-tasks/email/email-detail/email-detail.component';
import { EditorModule } from '@progress/kendo-angular-editor';
import { AttestationDetailComponent } from './Components/attestation/attestation-detail/attestation-detail.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    NavbarComponent,
    LogInComponent,
    SideNavComponent,
    Dashboard2Component,
    UserDetailsComponent,
    ProfileComponent,
    CourComponent,
    CourdetailsComponent,
    ChatComponent,
    EmailDetailComponent,
    AttestationDetailComponent,
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    BrowserAnimationsModule,
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
    CommonModule,
    ReactiveFormsModule,
    DateInputsModule,
    PagerModule,
    DialogsModule,
    HttpClientModule,
    MatGridListModule,
    SchedulerModule,
    TextBoxModule,
    DropDownsModule,
    TranslateModule.forRoot(),
    StreamAutocompleteTextareaModule,
    StreamChatModule,
    EditorModule,
    
    
 
    
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
