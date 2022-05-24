import React from "react";
import { NavLink } from "react-router-dom";
import { getRazas, getTemperament, filterTemperamentByStatus, filterCreated, orderByName} from "../actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LandingPage () {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRazas());
        dispatch(getTemperament());
      }, [dispatch]);
      
    return (
        <div>
            <h1>Bienvenidos</h1>
            <NavLink exact to="home">
                 <button>Ingresar</button>
            </NavLink>
        </div>
    )
};