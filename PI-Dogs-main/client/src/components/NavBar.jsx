import React from "react";
import { NavLink } from "react-router-dom";
import SerchBar from "./SerchBar";
import style from "./NavBar.module.css"

export default function NavBar(props) {
    return (
        <div className={style.conteiner}>
            <NavLink to="/home">
            <button>Home</button>
            </NavLink>
            <SerchBar/>
        </div>
    )
};