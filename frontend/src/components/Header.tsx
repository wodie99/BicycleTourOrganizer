import {Link, NavLink} from "react-router-dom";
import "../style/Header.css"

export default function Header() {
    return <header>
        <div className={"Row1"}>
            <span className={"header-title"}><b>bicycle tour organizer</b></span>
        </div>
        <div className={"Row2"}>
            <div>
                <Link to="/">Übersicht</Link>
            </div>
            <div>
                <NavLink to="/userpage">Useransicht</NavLink>
            </div>
            <div>
                <NavLink to="/logout">Logout</NavLink>
            </div>
        </div>
    </header>
}