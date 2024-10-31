import { makeAutoObservable } from "mobx";

export class AuthStore {
  isLoggedIn = false;

  constructor() {
    // Automatically makes this class observable
    makeAutoObservable(this);
  }

  login () {
    this.isLoggedIn = true;
  }

  logout () {
    this.isLoggedIn = false;
  }
}

export const authStore = new AuthStore();
