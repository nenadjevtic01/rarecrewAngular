import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Chart} from "chart.js";

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit, OnChanges{
  public chart: any;
  pieChartLabels: string[]=[];
  pieChartValues:number[]=[];
  pieChartColor:string[]=[];
  @Input() pieChartData:{ EmployeeName: string, TotalTimeWorked: number }[] = [];
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.splitData();
  }
  splitData(){
    this.pieChartData.forEach(employee=>{
      if(employee.EmployeeName==null){
        this.pieChartLabels.push("Employee name not provided");
      }else{
        this.pieChartLabels.push(employee.EmployeeName);
      }
        this.pieChartValues.push(employee.TotalTimeWorked);
        this.pieChartColor.push(this.getRandomColor());
    });
    this.createChart();
  }
  createChart(){
    if(this.pieChartValues.length>0){
      this.chart = new Chart("EmployeeStats", {
        type: 'pie',
        data: {
          labels: this.pieChartLabels,
          datasets: [{
            label: 'Employee statistic',
            data: this.pieChartValues,
            backgroundColor: this.pieChartColor,
            hoverOffset: 4
          }],
        },
        options: {
          aspectRatio:2.5
        }
      });
    }
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
