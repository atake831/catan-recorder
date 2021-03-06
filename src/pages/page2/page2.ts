import { Component } from '@angular/core';
import { Record } from '../../app/record.service';
import { HistoryService } from '../../app/history.service';
import { StorageService } from '../../app/storage.service';

import { RecordDetailPage } from '../record-detail/record-detail';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-page2',
  providers: [HistoryService, StorageService],
  templateUrl: 'page2.html',
})
export class Page2 {
  selectedItem: any;
  records: Record[];

  constructor(public navCtrl: NavController, private historyService: HistoryService) {
    this.records = historyService.getHistories();
  }

  showDetail(event, record: Record) {
    this.navCtrl.push(RecordDetailPage, {
      record: record
    });
  }
}
