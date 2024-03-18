"use client";

import shopStore from "./store";
import { Provider } from "react-redux";

export function ReduxProvider({ children }) {
  return <Provider store={shopStore}>{children}</Provider>;
}
