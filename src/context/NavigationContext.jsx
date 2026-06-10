import { createContext, useContext, useState } from "react";

export const PAGES = ["landing", "about", "work", "portfolio", "contact"];

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("landing");

  const currentIndex = PAGES.indexOf(currentPage);

  const goTo   = (page) => setCurrentPage(page);
  const goNext = () => { if (currentIndex < PAGES.length - 1) setCurrentPage(PAGES[currentIndex + 1]); };
  const goPrev = () => { if (currentIndex > 0) setCurrentPage(PAGES[currentIndex - 1]); };

  return (
    <NavigationContext.Provider value={{
      currentPage,
      currentIndex,
      goTo,
      goNext,
      goPrev,
      hasNext: currentIndex < PAGES.length - 1,
      hasPrev: currentIndex > 0,
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => useContext(NavigationContext);
