"use client";

import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);

  const [loader,setLoader] = useState(false);
  return (
    <GlobalContext.Provider value={{ showNavModal, setShowNavModal, loader, setLoader }}>
      {children}
    </GlobalContext.Provider>
  );
}
