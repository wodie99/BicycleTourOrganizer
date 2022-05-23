import {Link, NavLink} from "react-router-dom";
import "./Header.css"

export default function Header() {
    return <header>



        <div className={"Row1"}>

            <span className={"header-title"}><b>bicycle tour organizer</b></span>
        </div>
        <div className={"Row2"}>
            <div className={"L1"}>
                <Link to ="/">Übersicht</Link>
            </div>
            <div className={"L2"}>
                <NavLink to="/p1">Useransicht</NavLink>
            </div>
            <div className={"L3"}>
                <NavLink to="/p2">Logout</NavLink>
            </div>


        </div>


    </header>

}