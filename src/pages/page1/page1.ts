import { Component } from '@angular/core';
import { RecordService } from '../../app/record.service';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  providers: [RecordService],
  templateUrl: 'page1.html'
})
export class Page1 {
  diceCounter: { [key: number]: number };
  totalTurns: number;

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [ { 
        // gridLines: { display: false },
      } ],
      yAxes: [ { 
        // gridLines: { display: false },
        ticks: { beginAtZero: true, min:0, suggestedMax: 5 },
      } ],
    },
    animation: {
    },
  };
  public barChartLabels:string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartData:any[] = [ 
    { data: [], label: 'Count' } 
  ];

  constructor(public navCtrl: NavController, private recordService: RecordService) {
    this.update();
  }

  select(selectedNumber: number) {
    console.log(selectedNumber);
    this.recordService.push(selectedNumber);
    this.update();
  }

  back() {
    this.recordService.historyBack();
    this.update();
  }

  private update() {
    this.diceCounter = this.recordService.getCounter();
    this.totalTurns = this.recordService.getTotalTurns();
    this.setBarChartData();
  }

  private setBarChartData() {
    var data = []
    for ( var index in this.barChartLabels ) {
      data[index] = this.diceCounter[+ this.barChartLabels[index]] || 0;
    }
    // http://valor-software.com/ng2-charts/
    // 一度cloneしないと表示がupdateされない
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }

}
