import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDog } from "../actions";

export default function SerchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleImputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    };
    

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameDog(name));
    };

    return (
        <div >
            <input className="search"
                type="text"
                placeholder="Buscar..."
                onChange={(e) => handleImputChange(e)}
            ></input>
            <button className="botonSearch" type="submit" onClick={(e) => handleSubmit(e)}>
                Buscar
            </button>
        </div>
    );
}
