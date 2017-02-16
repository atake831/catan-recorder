import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  constructor() {
  }

  public get(key: string) {
    return localStorage.getItem(key);
  }

  public getHash(key: string) {
    let data = this.get(key);
    return JSON.parse(data) || {};
  }

  public getArray(key: string) {
    let data = this.get(key);
    return JSON.parse(data) || [];
  }

  public set(key: string, item: any) {
    localStorage.setItem(key, item);
  }
  public setWithJsonStringify(key: string, item: any) {
    this.set(key, JSON.stringify(item));
  }
}
