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
test("Başlangıçta Aktif Kare dökümanda mı?", () => {
  const activeSquare = screen.getByText("B");
  expect(activeSquare).toBeInTheDocument();
  expect(activeSquare.className).toContain("active");
});

test("Koordinat Değişimi", () => {
  const coordinates = screen.getByText(/Koordinatlar/);
  fireEvent.click(screen.getByText("YUKARI"));
  expect(coordinates).toHaveTextContent("Koordinatlar (2, 1)");
  fireEvent.click(screen.getByText("SOL"));
  expect(coordinates).toHaveTextContent("Koordinatlar (1, 1)");
  fireEvent.click(screen.getByText("SAĞ"));
  expect(coordinates).toHaveTextContent("Koordinatlar (2, 1)");
  fireEvent.click(screen.getByText("AŞAĞI"));
  expect(coordinates).toHaveTextContent("Koordinatlar (2, 2)");
});

