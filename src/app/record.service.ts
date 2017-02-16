import { Injectable } from '@angular/core';

export interface Record {
  diceHistory: number[]; 
  name: string;
  startTime: Date;
  endTime: Date;
}

@Injectable()
export class RecordService {
  private record: Record = {
    diceHistory: [],
    name: '',
    startTime: null,
    endTime: null,
  }

  constructor() {
  }

  public start() {
    this.record.startTime = new Date();
  }

  public end() {
    this.record.endTime = new Date();
  }

  public getRecord() {
    return this.record;
  }

  public setRecord(record: Record) {
    this.record = record;
  }

  public push(v: number) {
    this.record.diceHistory.push(v);
  }

  public historyBack() {
    this.record.diceHistory.pop();
  }

  public setRecordName(name: string) {
    this.record.name = name;
  }

  public getCounter(): { [key: number]: number } {
    return this.changeArrayToHash();
  }

  public getProbability(): { [key: number]: number } {
    var hashHistory = this.changeArrayToHash();

    for ( var key in hashHistory ) {
      hashHistory[key] = hashHistory[key] / this.record.diceHistory.length * 100;
    }

    return hashHistory;
  }

  public getTotalTurns(): number {
    return this.record.diceHistory.length;
  }

  private changeArrayToHash(): { [key: number]: number } {
    var hashHistory: { [key: number]: number } = {};

    this.record.diceHistory.forEach( (n) => {
      hashHistory[n] ? hashHistory[n]++ : hashHistory[n] = 1;
    });

    return hashHistory;
  }

}
