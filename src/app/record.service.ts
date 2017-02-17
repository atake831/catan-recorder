import { Injectable } from '@angular/core';

@Injectable()
export class Record {
  diceHistory: number[]; 
  name: string;
  startTime: Date;
  endTime: Date;

  constructor(diceHistory: number[] = [], name: string = '', startTime: Date = null, endTime: Date = null) {
    this.diceHistory = diceHistory;
    this.name = name;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  public getTotalTurns(): number {
    return this.diceHistory.length;
  }

  public getCountData(): { [key: number]: number } {
    var hashHistory: { [key: number]: number } = {};

    this.diceHistory.forEach( (n) => {
      hashHistory[n] ? hashHistory[n]++ : hashHistory[n] = 1;
    });

    return hashHistory;
  }
  
  public getProbabilityData(): { [key: number]: number } {
    var hashHistory = this.getCountData();

    for ( var key in hashHistory ) {
      hashHistory[key] = hashHistory[key] / this.getTotalTurns() * 100;
    }

    return hashHistory;
  }

  public start() {
    this.startTime = new Date();
  }

  public end() {
    this.endTime = new Date();
  }

  public push(v: number) {
    this.diceHistory.push(v);
  }

  public historyBack() {
    this.diceHistory.pop();
  }

  public setRecordName(name: string) {
    this.name = name;
  }

}
