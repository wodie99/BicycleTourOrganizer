import React from 'react';
import './App.css';
import useBtoDisplayItems from "./hooks/useBtoDisplayItems";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Logout from "./components/Logout";
import BtoItemsOverview from "./components/BtoItemsOverview";
import BtoUsersOverview from "./components/BtoUsersOverview";

function App() {
  const {btoDisplayItems} = useBtoDisplayItems();
  return (
      <div className="App">

              <Header />
              <Routes>
                  <Route path={"/"} element={<BtoItemsOverview btoDisplayItems={btoDisplayItems}/>}/>
                  <Route path={"/userpage"} element={<BtoUsersOverview btoDisplayItems={btoDisplayItems}/>}/>
                  <Route path={"/logout"} element={<Logout/>}/>
              </Routes>

      </div>
  );
}

export default App;
