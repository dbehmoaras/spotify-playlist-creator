import React from "react";

interface ContextInterface {
  logInState: boolean;
  toggleLogInState: () => void;
  globalUserId: string;
  storeGlobalUserId: () => void;
  activePlaylist: {
    id: string;
    name: string;
  };
  setActivePlaylist: Function;
  currentSong: string;
  setCurrentSong: Function;
}

const Context = React.createContext<ContextInterface>({
  logInState: false,
  toggleLogInState: () => {},
  globalUserId: "",
  storeGlobalUserId: () => {},
  activePlaylist: {
    id: "",
    name: "",
  },
  setActivePlaylist: () => {},
  currentSong: "",
  setCurrentSong: () => {},
});

export default Context;
