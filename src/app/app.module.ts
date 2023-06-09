import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog'
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabnavigationComponent } from './tabnavigation/tabnavigation.component';
import { HeaderComponent } from './header/header.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProjectsComponent } from './projects/projects.component';
import { CommonModule } from '@angular/common';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FilterpipePipe } from './Pipes/filterpipe.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { ProjectDetailsComponent } from './project-details/project-details.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TabnavigationComponent,
    HeaderComponent,
    EmployeeComponent,
    ProjectsComponent,
    AddemployeeComponent,
    AddProjectComponent,
    FilterpipePipe,
    EmployeeDetailsComponent,
    ProjectDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    MatIconModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
