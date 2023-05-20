import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent {
  @Input('peremployee') peremployee: any;
  @Input('employeeslt') employeeslt: any;
}
