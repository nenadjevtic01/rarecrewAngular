import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "./services/employee.service";
import {IRawEmployee} from "./interfaces/i-raw-employee";
import {IEmployee} from "./interfaces/i-employee";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  employeeData:IRawEmployee[] = [];
  formatedData:IEmployee[]=[];
  groupedEmployees: { EmployeeName: string, TotalTimeWorked: number }[] = [];


  constructor(private employeeService:EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeService.getEmployee().subscribe(data=>{
      this.employeeData=data;
      this.formatData();
    })

  }

  formatData(){
    this.calculateTotalTime();
  }

  calculateTotalTime() {
    this.formatedData = this.employeeData.map(employee => {
      const startTime = new Date(employee.StarTimeUtc);
      const endTime = new Date(employee.EndTimeUtc);
      const timeDifference = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60));

      return {
        Id: employee.Id,
        EmployeeName: employee.EmployeeName,
        TotalTimeWorked: timeDifference
      };
    });
    this.groupedEmployees=this.groupEmployeesByNameAndSumTime();
    this.groupedEmployees=this.groupedEmployees.slice().sort((a,b)=>b.TotalTimeWorked - a.TotalTimeWorked)
  }

  groupEmployeesByNameAndSumTime(): { EmployeeName: string, TotalTimeWorked: number }[] {
      return Object.values(this.formatedData.reduce((groups, employee) => {
        const key = employee.EmployeeName;

        if (!groups[key]) {
          groups[key] = { EmployeeName: key, TotalTimeWorked: 0 };
        }

        groups[key].TotalTimeWorked += employee.TotalTimeWorked;

        return groups;
      }, {} as { [key: string]: { EmployeeName: string, TotalTimeWorked: number } }));
  }
}
