import { Component } from '@angular/core';
import { RecordService, Record } from '../../app/record.service';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-record-detail',
  templateUrl: 'record-detail.html'
})
export class RecordDetailPage {
  record: Record;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.record = navParams.get('record');
  }

}
