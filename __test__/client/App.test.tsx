import React from "react";
import { render, screen, waitFor } from "../testing-library-utils";
import { userEvent } from "@te";
import "@testing-library/jest-dom/extend-expect";
import { server } from "../mocks/server";

import App from "../../src/client/App";
import Login from "../../src/client/containers/Login";
import UserPlaylists from "../../src/client/containers/UserPlaylists";
import Playlist from "../../src/client/containers/Playlist";
import CurrentSong from "../../src/client/containers/CurrentSong";
import FunctionButton from "../../src/client/components/FunctionButton";
import { rest } from "msw";

describe("Tests the Current Song Component", () => {
  // let AppComponent;

  beforeAll(() => {
    server.listen();
    rest.get();
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Current Song: renders", async () => {
    //can destructure getByTestId
    // server.resetHandlers("http://localhost:3001/spotify/playing", (req, res, ctx) => {
    //   rest.get()
    // }
    // )

    const AppComponent = render(<CurrentSong />);
    screen.debug();
    const currentSong = await AppComponent.findByText({
      name: /current song/i,
    });
    console.log(currentSong);
    // await waitFor(async () => {
    //   const currentCongContainer = await AppComponent.findByText({
    //     name: /current song:/i,
    //   });
    // });
    // const song = await rest.get("http://localhost:3001/spotify/playing");
  });
});
