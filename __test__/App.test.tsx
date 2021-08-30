import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/client/App";
import FunctionButton from "../src/client/components/FunctionButton";
import "@testing-library/jest-dom/extend-expect"

// test("FuncButt", () => {
//   render(<FunctionButton id="funcButtTest" title="funcButtTest" func={(mock)=> console.log(mock)} name={"FUNC_NAME_TEST"} data={{data: "mockData"}}/>);
//   const comp = screen.getByText('FUNC_NAME_TEST');
//   console.log(comp);
//   expect(comp).toBeInTheDocument();
// });

test('header renders with correct text', () => {
  //can destructure getByTestId
  const component = render(<App />);
  const headerEl = component.getByTestId("playlist-header");

  expect(headerEl.textContent).toBe("Spotify Playlist Creator");
})