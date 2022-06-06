import './App.css';
import useBtoDisplayItems from "./hooks/useBtoDisplayItems";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import LogoutPage from "./components/LogoutPage";
import BtoItemsOverview from "./components/BtoItemsOverview";
import BtoUsersOverview from "./components/BtoUsersOverview";
import BtoDetailsPage from "./components/BtoDetailsPage";
import LoginPage from "./components/LoginPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from "./routing/RequireAuth";
import useUsername from "./hooks/useUsername";

function App() {
    const {btoDisplayItems, changeBtoItem, updateVote} = useBtoDisplayItems();
    const {username, setUsername} = useUsername();

    return (
        <div className="App">
            <ToastContainer/>
            <Header />
            <Routes>
                <Route element={<RequireAuth/>}>
                    <Route path={"/"} element={<BtoItemsOverview btoDisplayItems={btoDisplayItems}/>}/>
                    <Route path={"/userpage"} element={<BtoUsersOverview btoDisplayItems={btoDisplayItems}/>}/>
                    <Route path={"/logout"} element={<LogoutPage setUsername={setUsername}/>}/>
                    <Route path={'/btoItem/:id'} element={<BtoDetailsPage
                        btoDisplayItems={btoDisplayItems}
                        changeBtoItem={changeBtoItem}
                        updateVote={updateVote}
                        username={username}/>}/>
                </Route>
                <Route path={'/login'} element={<LoginPage />}/>
            </Routes>
        </div>
    );
}

export default App;
