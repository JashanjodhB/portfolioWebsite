import { useRef } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { NavigationProvider, useNavigation } from "./context/NavigationContext";
import { StarBackground } from "./components/StarBackground/StarBackground";
import { PageFold } from "./components/PageFold/PageFold";
import { Landing } from "./components/sections/Landing";
import { About } from "./components/sections/About";
import { Work } from "./components/sections/Work";
import { Portfolio } from "./components/sections/Portfolio";
import { Contact } from "./components/sections/Contact";

const PAGE_MAP = {
  landing:  <Landing />,
  about:    <About />,
  work: <Work />,
  portfolio: <Portfolio />,
  contact:  <Contact />,
};

function Pages() {
  const { currentPage } = useNavigation();

  return (
    <main key={currentPage} className="pageEnter">
      {PAGE_MAP[currentPage]}
    </main>
  );
}

function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <StarBackground />
        <PageFold />
        <Pages />
      </NavigationProvider>
    </ThemeProvider>
  );
}

export default App;
