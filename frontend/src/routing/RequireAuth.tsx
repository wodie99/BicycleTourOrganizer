import {useContext} from "react";
import {AuthContext} from "../context/AuthProvider";
import {Navigate, Outlet} from "react-router-dom";

export default function RequireAuth() {
    const {token} = useContext(AuthContext)
    return (token ? <Outlet /> : <Navigate to={"/login"} />)
}
