import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabnavigationComponent } from './tabnavigation/tabnavigation.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'tabnavigation', component:TabnavigationComponent},
  {path:'employee', component:EmployeeComponent},
  {path:'projects', component:ProjectsComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
