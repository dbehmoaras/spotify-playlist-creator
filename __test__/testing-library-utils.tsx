/**
 * Overrides render method to render with our Context Provider.
 *
 * This basically renders out the App component with the provider. The provider should have been passed in from the index - now you can't test the app component on it's own.
 */

import React, { FC, ReactElement, useState } from "react";
import { render, RenderOptions } from "@testing-library/react";
import Context from "./../src/client/context/Context";
import Login from "./../src/client/containers/Login";
import UserPlaylists from "./../src/client/containers/UserPlaylists";
import Main from "./../src/client/containers/Main";
import CurrentSong from "./../src/client/containers/CurrentSong";

function MockCookie() {
  this.userName = "TestUser";
  this.userId = "1234567890";

  this.get = (str) => {
    if (str === "userName") return this.userName;
    if (str === "userId") return this.userId;
  };
}

const MockCookies = new MockCookie();

const CustomProvider: FC = () => {
  const [logInState, setLogInState] = useState(
    MockCookies.get("userName") ? true : false
  );
  const [globalUserId, setGlobalUserId] = useState(
    MockCookies.get("userId") ? MockCookies.get("userId") : ""
  );
  const [activePlaylist, setActivePlaylist] = useState({
    id: "",
    name: "",
  });
  const [currentSong, setCurrentSong] = useState("");

  const toggleLogInState = () =>
    setLogInState(MockCookies.get("userName") ? true : false);
  const storeGlobalUserId = () =>
    setGlobalUserId(MockCookies.get("userId") ? MockCookies.get("userId") : "");

  console.log("login state", logInState);

  // console.log(children);

  const children = [
    <UserPlaylists key={2} />,
    <Main key={3} />,
    <CurrentSong key={4} />,
  ];

  return (
    <Context.Provider
      value={{
        logInState,
        toggleLogInState,
        globalUserId,
        storeGlobalUserId,
        activePlaylist,
        setActivePlaylist,
        currentSong,
        setCurrentSong,
      }}
    >
      <div id="master-container">
        <h1 key={0} id="playlist-header">
          Spotify Playlist Creator
        </h1>
        <Login key={1} />
        <div id="app-container">{children}</div>
      </div>
    </Context.Provider>
  );
};

const renderWithContext: ReactElement = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  return render(ui, { wrapper: CustomProvider, ...options });
};

//re-export everything
export * from "@testing-library/react";
export { renderWithContext as render };

// module.exports = {
// * from "@testing-l",
// };
