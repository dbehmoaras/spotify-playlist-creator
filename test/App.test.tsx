import React from "react";
import { render, screen } from "@testing-library/react";
// import App from "./../src/client/App";
import FunctionButton from "./../src/client/components/FunctionButton";
// import '@testing-library/jest-dom';

// console.log(RU)

// const App = require("./../src/client/App.tsx");

test("FuncButt", () => {
  render(<FunctionButton id="funcButtTest" title="funcButtTest" func={(mock)=> console.log(mock)} name={"FUNC_NAME_TEST"} data={{data: "mockData"}}/>);
  const comp = screen.getByText('FUNC_NAME_TEST');
  console.log(comp);
  expect(comp).toBeInTheDocument();
});