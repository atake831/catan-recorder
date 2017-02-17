import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Record } from './record.service';

@Injectable()
export class HistoryService {
  private histories: Record[]; 
  private historyKey = 'catanRecorderHistories';

  constructor(private storageService: StorageService) {
    this.histories = storageService.getArray(this.historyKey)
                                   .map(item => item as Record);
  }

  public getHistories() {
    return this.histories;
  }

  public addHistory(record: Record) {
    this.histories.push(record);
    this.storageService.setWithJsonStringify(this.historyKey, this.histories);
  }

}
