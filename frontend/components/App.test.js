import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppFunctional from "./AppFunctional";
test("hata olmadan render ediliyor", () => {
  render(<AppFunctional />);
});

beforeEach(() => {
  render(<AppFunctional />);
});
