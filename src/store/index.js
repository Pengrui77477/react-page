// import React from "react";
import LoginStore from "./login.Store";
import UserStore from "./user.Store";


class RootStore {
  constructor() {
    this.loginStore = new LoginStore();
    this.userStore = new UserStore();
    //
  }
}

// const context = React.createContext(rootStore);

// const useStore = () => React.useContext(rootStore);
export default RootStore;
