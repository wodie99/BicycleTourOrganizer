import React from 'react';
import './App.css';
import useBtoDisplayItems from "./hooks/useBtoDisplayItems";
import BtoDisplayItemsOverview from "./components/BtoDisplayItemsOverview";

function App() {
  const {btoDisplayItems} = useBtoDisplayItems();
  return (
    <div className="App">
      <BtoDisplayItemsOverview btoDisplayItems={btoDisplayItems}/>
    </div>
  );
}

export default App;
