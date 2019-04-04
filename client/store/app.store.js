import { observable, computed, action } from "mobx";

export default class AppState {
  constructor({ count = 0, name = "" } = {}) {
    this.count = count;
    this.name = name;
  }

  @observable name;

  @observable count;

  @computed get msg() {
    return `name: ${this.name}  count: ${this.count}`;
  }

  @action add() {
    this.count += 1;
  }

  @action changeName(name) {
    this.name = name;
  }

  toJson() {
    return {
      count: this.count,
      name: this.name
    };
  }
}
