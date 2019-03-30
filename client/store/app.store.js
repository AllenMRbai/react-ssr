import { observable, computed, action, autorun } from "mobx";

export class AppState {
  @observable name = "Allen";

  @observable count = 0;

  @computed get msg() {
    return `name: ${this.name}  count: ${this.count}`;
  }

  @action add() {
    this.count += 1;
  }
}

const appState = new AppState();

autorun(() => {
  console.log(appState.msg);
});

setInterval(() => {
  appState.add();
}, 1000);

export default appState;
