import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Watchlist from "./components/Watchlist";
import Banner from "./components/Banner";
import { useEffect, useState } from "react";
import { ContextPath } from "./components/ContextPath";

function App() {
  const [watchlist, setWatchList] = useState([]);

  return (
    <>
      <ContextPath.Provider value={{ watchlist, setWatchList }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  <Movies />
                </>
              }
            />
            <Route
              path="/watchlist"
              element={
                <Watchlist/>
              }
            />
          </Routes>
        </BrowserRouter>
      </ContextPath.Provider>
    </>
  );
}

export default App;
