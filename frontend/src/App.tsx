import React from 'react';
import './App.css';
import useBtoDisplayItems from "./hooks/useBtoDisplayItems";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Logout from "./components/Logout";
import BtoItemsOverview from "./components/BtoItemsOverview";
import BtoUsersOverview from "./components/BtoUsersOverview";
import BtoDetailsPage from "./components/BtoDetailsPage";
import LoginPage from "./components/LoginPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from "./routing/RequireAuth";

function App() {
    const {btoDisplayItems, changeBtoItem} = useBtoDisplayItems();
    return (
        <div className="App">
            <ToastContainer/>
            <Header/>
            <Routes>
                <Route element={<RequireAuth/>}>

                    <Route path={"/"} element={<BtoItemsOverview btoDisplayItems={btoDisplayItems}/>}/>
                    <Route path={"/userpage"} element={<BtoUsersOverview btoDisplayItems={btoDisplayItems}/>}/>
                    <Route path={"/logout"} element={<Logout/>}/>
                    <Route path={'/btoItem/:id'} element={<BtoDetailsPage
                        btoDisplayItems={btoDisplayItems}
                        changeBtoItem={changeBtoItem}/>}/>
                </Route>
                <Route path={'/login'} element={<LoginPage />}/>
            </Routes>

        </div>
    );
}

export default App;
