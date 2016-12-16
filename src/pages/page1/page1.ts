import { Component } from '@angular/core';
import { RecordService } from '../../app/record.service';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  providers: [RecordService],
  templateUrl: 'page1.html'
})
export class Page1 {
  diceProbability: { [key: number]: number };
  totalTurns: number;

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
    this.diceProbability = this.recordService.getProbability();
    this.totalTurns = this.recordService.getTotalTurns();
  }


}
