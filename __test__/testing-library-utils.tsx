/**
 * Overrides render method to render with our Context Provider
 */

import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import Context from "./../src/client/context/Context";

// const;

const renderWithContext: ReactElement = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  return render(ui, { wrapper: Context.Provider, ...options });
};

//re-export everything
export * from "@testing-library/react";
export { renderWithContext as render };

// module.exports = {
// * from "@testing-l",
// };
