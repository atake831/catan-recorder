import { Component } from '@angular/core';
import { RecordService } from '../../app/record.service';
import { HistoryService } from '../../app/history.service';
import { StorageService } from '../../app/storage.service';

import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  providers: [RecordService, HistoryService, StorageService],
  templateUrl: 'page1.html'
})
export class Page1 {
  diceCounter: { [key: number]: number };
  totalTurns: number = 0;
  isAverageView: boolean;

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

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, private recordService: RecordService, private historyService: HistoryService) {
    this.update();
    this.viewCount();
  }

  select(selectedNumber: number) {
    if ( this.totalTurns === 0 ) this.recordService.start();
    this.recordService.push(selectedNumber);
    this.update();
  }

  back() {
    this.recordService.historyBack();
    this.update();
  }

  viewCount() {
    this.isAverageView = false;
    this.changeBarChartData("Count");
    this.update();
  }

  viewAverage() {
    this.isAverageView = true;
    this.changeBarChartData("Average");
    this.update();
  }

  save() {
    let prompt = this.alertCtrl.create({
      title: 'レコードを保存します',
      message: "レコードのタイトルを記入して保存してください",
      inputs: [
        {
          name: 'title',
          placeholder: 'タイトル'
        },
      ],
      buttons: [
        {
          text: 'キャンセル',
          handler: data => {
          }
        },
        {
          text: '保存',
          handler: data => {
            this.saveRecord(data.title);
          }
        }
      ]
    });
    prompt.present();
  }

  private saveRecord(name: string) {
    this.recordService.end();
    this.recordService.setRecordName(name);
    this.historyService.addHistory(this.recordService.getRecord());
  }

  private changeBarChartData(labelName: string) {
    this.barChartData[0]["label"] = labelName;
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
      if ( this.isAverageView ) {
        data[index] = data[index] / this.totalTurns * 100;
      }
    }

    // http://valor-software.com/ng2-charts/
    // 一度cloneしないと表示がupdateされない
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }

}
