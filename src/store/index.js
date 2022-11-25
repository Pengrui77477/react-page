// import React from "react";
import LoginStore from "./login.Store";

class RootStore {
  constructor() {
    this.loginStore = new LoginStore();

    //
  }
}

// const context = React.createContext(rootStore);

// const useStore = () => React.useContext(rootStore);
export default RootStore;
