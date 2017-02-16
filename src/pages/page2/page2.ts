import { Component } from '@angular/core';
import { RecordService, Record } from '../../app/record.service';
import { HistoryService } from '../../app/history.service';
import { StorageService } from '../../app/storage.service';

import { NavController } from 'ionic-angular';

import {Deploy} from '@ionic/cloud-angular';

@Component({
  selector: 'page-page2',
  providers: [HistoryService, StorageService],
  templateUrl: 'page2.html'
})
export class Page2 {
  selectedItem: any;
  records: Record[];

  constructor(public deploy: Deploy, public navCtrl: NavController, private historyService: HistoryService) {
    this.records = historyService.getHistories();

    this.deploy.check().then((snapshotAvailable: boolean) => {
      if ( snapshotAvailable ) {
        this.deploy.download().then(() => {
          return this.deploy.extract();
        });
      }
    });
  }

  showDetail(event, record: Record) {
  }
}
