import {NavLink} from "react-router-dom";
import "../style/Header.css"
import {useContext} from "react";
import {AuthContext} from "../context/AuthProvider";

export  default function Header() {
    const {token} = useContext(AuthContext);

    return <header>
        <div className={"row1"}>
            <span className={"header-title"}><b>bicycle tour organizer</b></span>
        </div>
        {token ?
            <div className={"row2"}>
                <div>
                    <NavLink to="/">Übersicht</NavLink>
                </div>
                <div>
                    <NavLink to="/userpage">Useransicht</NavLink>
                </div>
                <div>
                    <NavLink to="/logout">Logout</NavLink>
                </div>
            </div>
            :
            <p className={"row2-login"}>Login</p>
        }
    </header>
}
