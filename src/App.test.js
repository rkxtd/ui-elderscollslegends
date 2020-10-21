import React from "react";
import App from "./App";
import { describe, it } from "@jest/globals";
import { shallow } from "enzyme";

describe("Test App Component", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });
});
