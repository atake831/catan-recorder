import { Component } from '@angular/core';
import { Record } from '../../app/record.service';
import { HistoryService } from '../../app/history.service';
import { StorageService } from '../../app/storage.service';

import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  providers: [Record, HistoryService, StorageService],
  templateUrl: 'page1.html'
})
export class Page1 {
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, private historyService: HistoryService, public record: Record) {
  }

  select(selectedNumber: number) {
    if ( this.record.getTotalTurns() === 0 ) {
      this.record.start();
    }
    this.record.push(selectedNumber);
  }

  back() {
    this.record.historyBack();
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
    this.record.end();
    this.record.setRecordName(name);
    this.historyService.addHistory(this.record);
  }

}
