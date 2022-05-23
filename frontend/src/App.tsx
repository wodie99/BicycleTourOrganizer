import React from 'react';
import './App.css';
import useBtoDisplayItems from "./hooks/useBtoDisplayItems";
import {Route, Routes} from "react-router-dom";
import BtoUserItemsOverview from "./components/BtoUserItemsOverview";
import Header from "./components/Header";
import Impressum from "./components/Impressum";
import BtoDisplayItemCard from "./components/BtoDisplayItemCard";

function App() {
  const {btoDisplayItems} = useBtoDisplayItems();
  return (
      <div className="App">

              <Header />
              <Routes>
                  <Route path={"/"} element={btoDisplayItems.map(item => <BtoDisplayItemCard btoDisplayItem={item} />)}/>
                  <Route path={"/p1"} element={<BtoUserItemsOverview btoDisplayItems={btoDisplayItems}/>}/>
                  <Route path={"/p2"} element={<Impressum />}/>
              </Routes>

      </div>
  );
}

export default App;
