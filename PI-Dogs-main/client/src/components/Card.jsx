import React from "react";
import { NavLink } from "react-router-dom";

export default function Card({ name, temperament, image, weight, height, id, life_span }) {
   
    return (
        <div className="cuerpo-tarjeta">
            <NavLink to={`/home/${id}`}>
            <h3>{name}</h3>
            <div className="foto">
                <img src={image} alt="img not found" width="220px" heigth="105px" />
                </div>
                <div className="detalle">
                
                <h5>"Peso "{weight} "Kg" </h5>
                <h5>"Altura "{height} "Cm"</h5>
               <h5>"Esperanza de vida" {life_span}</h5>
                <h5>"Temperamento "{temperament}</h5>
                
                </div>
                </NavLink>
        </div>
    );
}

// {
//     /* <div>
//           <h3>{name}</h3>
//           <img src={image} alt= "img not found" width="200px" heigth="250px"/>
//           <h4>{weight} "Kg"</h4>
//           <h4>{height}</h4>
//           <h4>{temperament}</h4>
//          </div> */
// }
