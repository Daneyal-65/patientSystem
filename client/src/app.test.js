import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Header from "./components/Header";
//  resole this issue because i have no idea what to do with
// i have tryibg so much thing from youtube, docs,jest docs,chatGPT but i can not fix this issue
test("app", () => {
  render(<Header />);
  const login = screen.getByText(/logint/i);
  expect(login).toBeInTheDocument();
});
