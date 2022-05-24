import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function Detail (){
 
    const {id} = useParams();
  
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])

    const myDetail = useSelector((state) => state.detail)

    return (
        <div>
            {
                myDetail.length > 0 ?
                <div>
                    <h1>Raza {myDetail[0].name}</h1>
                    <img src={myDetail[0].image ? myDetail[0].image : myDetail[0].image} alt="" with="500px" height="700px"></img>
                    <h2>Height: {myDetail[0].height}</h2>
                    <h2>Weight: {myDetail[0].weight}</h2>
                    <p>Life_Span: {myDetail[0].life_span}</p>
                    <h5>Temperament: {myDetail[0].temperament}</h5>
                </div> : <img src="https://media1.giphy.com/media/TfibNMRMHnsotiVxIq/200w.gif?cid=82a1493bnsd64jofja9tkkss5st8aa3nr2eeovkud8cu5z7m&rid=200w.gif&ct=g" alt="img not found" width="300px" heigth="300px" />
               
            }
            <NavLink to="/home">
                <button>Volver</button>
            </NavLink>
        </div>
    )
};