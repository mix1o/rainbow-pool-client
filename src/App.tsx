import { FC, useEffect, useState } from "react";
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
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import History from "./components/History/History";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";

const App: FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      const parsedTheme = JSON.parse(theme);
      setIsDark(parsedTheme === "light" ? false : true);
    }
  }, []);

  const changeTheme = () => {
    setIsDark(!isDark);

    if (isDark) {
      localStorage.setItem("theme", JSON.stringify("light"));
    } else {
      localStorage.setItem("theme", JSON.stringify("dark"));
    }
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <UserBalanceProvider>
        <ThemeProvider theme={isDark ? darkStyles : defaultStyles}>
          <GlobalStyle isDark={isDark} />
          <Updater />
          <Header>
            <div className="container-theme">
              <NightlightOutlinedIcon />
              <ToggleTheme onClick={() => changeTheme()} isDark={isDark}>
                <Circle isDark={isDark} />
              </ToggleTheme>
            </div>
          </Header>

          <main>
            <Router>
              <div className="container-links">
                <Link to="/history">History</Link>
                <Link to="/">Pool</Link>
              </div>
              <Routes>
                <Route path="/history" element={<History />} />
                <Route path="/" element={<Exchanger />} />
              </Routes>
            </Router>
          </main>
        </ThemeProvider>
      </UserBalanceProvider>
    </Web3ReactProvider>
  );
};

export default App;
