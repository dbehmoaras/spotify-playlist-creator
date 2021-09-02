import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/client/App";
import FunctionButton from "../src/client/components/FunctionButton";
import "@testing-library/jest-dom/extend-expect"

test('header renders with correct text', () => {
  //can destructure getByTestId
  const component = render(<App />);
  const headerEl = component.getByTestId("playlist-header");

  expect(headerEl.textContent).toBe("Spotify Playlist Creator");
})