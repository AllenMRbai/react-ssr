import { observable, computed, action } from "mobx";

export default class AppState {
  @observable name = "Allen";

  @observable count = 0;

  @computed get msg() {
    return `name: ${this.name}  count: ${this.count}`;
  }

  @action add() {
    this.count += 1;
  }

  @action changeName(name) {
    this.name = name;
  }
}
