import React from "react";
import { render, screen } from "../testing-library-utils";
import App from "../../src/client/App";
import FunctionButton from "../../src/client/components/FunctionButton";
import "@testing-library/jest-dom/extend-expect";

describe("tests the app header and login button", () => {
  let AppComponent;

  beforeEach(() => {
    AppComponent = render(<App />);
  });

  test("header renders with correct text", () => {
    //can destructure getByTestId
    screen.debug();

    const headerEl = AppComponent.getByRole("heading", {
      name: /spotify playlist creator/i,
    });
    expect(headerEl.textContent).toBe("Spotify Playlist Creator");
  });

  // test("login button renders with empty user invofrmation");
});

// test('can it find a button that\'s a div', () => {
//   const
// })
