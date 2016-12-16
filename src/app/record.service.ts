import { Injectable } from '@angular/core';

@Injectable()
export class RecordService {
  private diceHistory: number[]; 

  constructor() {
    this.diceHistory = [];
  }

  public push(v: number) {
    this.diceHistory.push(v);
  }

  public historyBack() {
    this.diceHistory.pop();
  }

  public getCounter(): { [key: number]: number } {
    return this.changeArrayToHash();
  }

  public getProbability(): { [key: number]: number } {
    var hashHistory = this.changeArrayToHash();
    console.log(hashHistory);

    for ( var key in hashHistory ) {
      hashHistory[key] = hashHistory[key] / this.diceHistory.length * 100;
    }

    console.log(hashHistory);

    return hashHistory;
  }

  public getTotalTurns(): number {
    return this.diceHistory.length;
  }

  private changeArrayToHash(): { [key: number]: number } {
    var hashHistory: { [key: number]: number } = {};

    this.diceHistory.forEach( (n) => {
      hashHistory[n] ? hashHistory[n]++ : hashHistory[n] = 1;
    });

    return hashHistory;
  }

}
