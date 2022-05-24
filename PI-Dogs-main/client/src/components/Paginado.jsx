import React from "react";

export default function Paginado ({dogForPage, allRazas, paginado}) {
    const pageNumber = [];

    for ( let i = 1; i <= Math.ceil(allRazas/dogForPage); i++){
        pageNumber.push(i)
    }
    return (
        <nav >
            <ul className="pagination">
                {pageNumber && pageNumber.map(number =>(
                    <li className="number" key={number}>
                    <button className="boton" onClick={()=>paginado(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
};
