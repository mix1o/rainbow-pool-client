import { FC, useState } from "react";
import Header from "./components/Header/Header";
import Exchanger from "./components/Exchanger/Exchanger";
import { Web3ReactProvider } from "@web3-react/core";
import { UserBalanceProvider } from "./context/UserBalance";
import Updater from "./components/Updater/Updater";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { defaultStyles, darkStyles } from "./styles/themes";
import { Circle, ToggleTheme } from "./styles/ToggleTheme";
import { getLibrary } from "./functions/getLibrary";

const App: FC = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <UserBalanceProvider>
        <ThemeProvider theme={isDark ? darkStyles : defaultStyles}>
          <GlobalStyle isDark={isDark} />
          <Updater />
          <Header>
            <span>Dark theme </span>
            <ToggleTheme onClick={() => setIsDark(!isDark)} isDark={isDark}>
              <Circle isDark={isDark} />
            </ToggleTheme>
          </Header>
          <main>
            <Exchanger />
          </main>
        </ThemeProvider>
      </UserBalanceProvider>
    </Web3ReactProvider>
  );
};

export default App;
