import { Component, Input, DoCheck } from '@angular/core';

import { Record } from '../../app/record.service';

@Component({
  selector: 'chart',
  templateUrl: 'chart.html'
})

export class ChartComponent implements DoCheck {
  @Input() record: Record = new Record();
  oldTurns: number = 0;
  isAverageView: boolean = false;

  constructor() {
  }

  // ngOnChangesはobject referenceが変わらないと発火されない
  // 今回はrecordのpropertyしか変化しないので、ngDoCheckで判定する必要がある
  // https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html#!#docheck
  ngDoCheck() {
    if ( this.oldTurns !== this.record.getTotalTurns() ) {
      this.updateChart();
    }
    this.oldTurns = this.record.getTotalTurns();
  }

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

  viewCount() {
    this.isAverageView = false;
    this.changeBarChartData("Count");
    this.convertCount();
  }

  viewAverage() {
    this.isAverageView = true;
    this.changeBarChartData("Average");
    this.convertAverage();
  }

  private updateChart() {
    if ( this.isAverageView ) {
      this.convertAverage();
    }
    else {
      this.convertCount();
    }
  }

  private convertCount() {
    this.convertData(this.record.getCountData());
  }

  private convertAverage() {
    this.convertData(this.record.getProbabilityData());
  }

  private convertData(diceData) {
    var chartData = []
    for ( let diceNumber in diceData ) {
      // diceNumberは2から始まり、chartDataは2 -> 0となるので、2を引く
      // "+" はstring -> intのキャスト。diceNumberはstring
      chartData[+ diceNumber - 2] = diceData[diceNumber] || 0;
    }
    this.setChartData(chartData);
  }

  private changeBarChartData(labelName: string) {
    this.barChartData[0].label = labelName;
  }

  private getChartData() {
    return this.barChartData[0].data;
  }

  private setChartData(data) {
    // http://valor-software.com/ng2-charts/
    // 一度cloneしないと表示がupdateされない
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }

}
