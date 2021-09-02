import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/client/App";
import FunctionButton from "../src/client/components/FunctionButton";
import "@testing-library/jest-dom/extend-expect";

describe("tests the app headers", () => {
  let AppComponent;

  beforeEach(() => {
    AppComponent = render(<App />);
  });

  test("header renders with correct text", () => {
    //can destructure getByTestId
    const headerEl = AppComponent.getByTestId("playlist-header");
    expect(headerEl.textContent).toBe("Spotify Playlist Creator");
  });
});

// test('can it find a button that\'s a div', () => {
//   const
// })
