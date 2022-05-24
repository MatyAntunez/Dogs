import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
 import { getRazas, getTemperament, filterTemperamentByStatus, filterCreated, orderByName, filterCreatedApi, cleanDetail} from "../actions";
import { NavLink } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import style from "./Home.module.css";




export default function Home() {
  const dispatch = useDispatch();
  const allRazas = useSelector((state) => state.razas);
  const allTemperament = useSelector((state) => state.temperament);
  const [actualPage, setActualPage] = useState(1);
  const [dogForPage, setDogForPage] = useState(8);
  const lastDogForPage = actualPage * dogForPage;
  const firstDog = lastDogForPage - dogForPage;
  const dogInPageActual = allRazas.slice(firstDog, lastDogForPage)
  const [orden, setOrden] = useState("");
  console.log(dogInPageActual
    )

  const paginado = (pageNumber) => {
      setActualPage(pageNumber)
  };


 

  useEffect(() => {
    dispatch(getRazas());
    dispatch(getTemperament());
    dispatch(cleanDetail())
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRazas);
  }

  function handleFilterStatus (e) {
    dispatch(filterTemperamentByStatus(e.target.value))
  };

  function handleFilterCreated (e) {
    dispatch(filterCreated(e.target.value))
    setOrden(`Ordenado ${e.target.value}`);
  };

  function handleFilterCreatedApi (e) {
    dispatch(filterCreatedApi(e.target.value))
    setOrden(`Ordenado ${e.target.value}`);
  };

   function handleSort (e) {
     e.preventDefault();
     dispatch(orderByName(e.target.value))
     setActualPage(1);
     setOrden(`Ordenado ${e.target.value}`);
   }

  return (
    <div>
      <div className="barra">
      
      <NavLink to="/create"><button className="botonSearch">Crear Raza de perro</button></NavLink>
      
      <h1>DOGS</h1>
      <button className="tem" onClick={(e) => {handleClick(e)}}> Volver a cargar Razas</button>
      <div>
      <label className={style.label}>Ordenar por: </label>
        <select onChange= {e => handleFilterStatus(e)} className="tem">
          <option value="temperament" >Temperamento</option>
          {allTemperament?.map((e) => {
          return (
            <option value={e.name} key={e.id}>{e.name}</option>
          );
        })}
        </select>
        <label className={style.label}>Ordenar por: </label>
        <select onChange= {e => handleSort(e)}className="tem">
          <option value="rden" >'Orden'</option>
          <option value="asc">Ascendente A - Z</option>
          <option value="desc">Descendente Z - A</option>  
        </select>
        <label className={style.label}>Ordenar por: </label>
        <select className="tem">
          <option value="weight">Peso por Kg</option>
          <option value="weight mayor">"Peso Mayor a Menor"</option>
          <option value="weight menor">"Peso Menor a Mayor"</option>
          
        </select >
          {/* <label className={style.label}>Ordenar por: </label> */}
        <button onClick= {e => handleFilterCreated(e)} className="tem">
          {/* <option value="all">Todas las razas</option> */}
         'Razas de la BD'
        </button>
        <button value="exist" onClick= {e => handleFilterCreatedApi(e) } className="tem">Razas de la API</button>
        <Paginado
        dogForPage= {dogForPage}
        allRazas= {allRazas.length}
        paginado= {paginado}/>

        
        </div>
        
        <div className="container">
        {dogInPageActual?.map((e) => {
          return (
            <React.Fragment key={e.id}>
              {/* <NavLink to={"/home" + e.id}> */}
               
                <Card
                id={e.id}
                  name={e.name}
                  temperament={e.temperament}
                   image={e.image? e.image : e.img}
                  key={e.id}
                  weight={e.weight}
                  height={e.height}
                  life_span={e.life_span}
                />
               
              
              </React.Fragment>
          );
        })} 
        
        </div>
      </div>
      
    </div>
  );
}
