import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../../models/employee';

declare var M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  constructor( private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  addEmployee(form: NgForm){
     if(form.value._id){
       this.employeeService.putEmployee(form.value)
       .subscribe(res => {
        this.resetForm();
        M.toast({html: 'Updated Successfuly'});
        this.getEmployees();
       })
     } else {
      this.employeeService.postEmployee(form.value)
      .subscribe(res => {
       this.resetForm();
       M.toast({html: 'Save Successfuly'});
       this.getEmployees();
      });
     }
  }

  getEmployees(){
    this.employeeService.getEmployees()
     .subscribe(res => {
       this.employeeService.employees = res as Employee[];
     });
  }

  editEmployee(employee: Employee){
    this.employeeService.selectedEmployee = employee;
  }

  deleteEmployee(_id: string, form: NgForm){
    if(confirm('Are you sure you want to delete it?')){
      this.employeeService.deleteEmployee(_id)
      .subscribe(res => {
        this.getEmployees();
        this.resetForm(form);
        M.toast({html: 'Deleted Succesfully'});
      }); 
    }
  }

  resetForm(form?: NgForm){
    if (form){
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }
}
