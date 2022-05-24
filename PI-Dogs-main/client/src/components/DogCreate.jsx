import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperament2, postDog } from "../actions";
import { useState } from "react";
// import s from "../App.css"

function validate(temporal) {
    let errors = {};
    errors.button = false
    if (!temporal.name || temporal.name === "") {
        errors.name = <i className="i">"Debe ingresar una raza de perro!!"</i>
        errors.button = true

    }   if (!temporal.heightMin || temporal.heightMin < 0 ) {
        errors.heightMin = <i className="i">"Debe ingresar altura valida!!"</i>
        errors.button = true

     } if (!temporal.heightMax || temporal.heightMax > 100) {
            errors.heightMax = <i className="i">"Debe ingresar altura valida!!"</i>
            errors.button = true
        
        } if (!temporal.weightMin ||  temporal.weightMin < 0 ) {
        errors.weightMin = <i className="i">"Debe ingresar peso valido!!"</i>
        errors.button = true

        } if (!temporal.weightMax || temporal.weightMax > 100) {
        errors.weightMax = <i className="i">"Debe ingresar peso valido!!"</i>
        errors.button = true

        } if (!temporal.life_spanMin ||  temporal.life_spanMin < 0 ) {
        errors.life_spanMin = <i className="i">"Debe ingresar esperanza de vida valida!!"</i>
        errors.button = true

        } if ( !temporal.life_spanMax || temporal.life_spanMax > 100) {
        errors.life_spanMax = <i className="i">"Debe ingresar esperanza de vida valida!!"</i>
        errors.button = true

        } if (!temporal.temperament) {
        errors.temperament = <i className="i">"Debe seleccionar al menos un temperamento!!"</i>
        errors.button = true

    }  if ( !temporal.image ) {
        errors.life_spanMax = <i className="i">"Debe ingresar una imagen!!"</i>
        errors.button = true
    } 
    return errors;

};





export default function DogCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const navigateTo = useNavigate(); ESTA ES LA VERSION 6 DE REAC-ROUTER-DOM  REEMPLAZA AL USEHISTORI
    const perros = useSelector((state) => state.dogs)
    const [errors, setErrors] = useState({});

    const [temporal, setTemporal] = useState({
        name: "",
        heightMin: 0,
        heightMax: 0,
        weightMin: 0,
        weightMax: 0,
        life_spanMin: 0,
        life_spanMax: 0,
        image: "",
        temperament: [],
    });

    const [input, setInput] = useState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        image: "",
        temperament: [],

    });
    function concat() {
        console.log(`______AQUI_TROLE 3___________\n ${temporal.image}, ${temporal.heightMin}, ${temporal.heightMax}, ${temporal.weightMin},${temporal.weightMax},${temporal.life_spanMin}, ${temporal.life_spanMax}`)

        setInput({
            name: `${temporal.name}`,
            height: `${temporal.heightMin} - ${temporal.heightMax}`,
            weight: `${temporal.weightMin} - ${temporal.weightMax}`,
            life_span: `${temporal.life_spanMin} - ${temporal.life_spanMax}`,
            image: `${temporal.image}`,
            temperament: [`${temporal.temperament}`],
        })
    };


    function handleChange(e) {
        console.log(`______AQUI_TROLE 5___________\n ${temporal.image},${temporal.name}, ${temporal.heightMax}, ${temporal.weightMin},${temporal.weightMax.heightMin}, ${temporal.heightMax}, ${temporal.weightMin},${temporal.weightMax},${temporal.life_spanMin}, ${temporal.life_spanMax}`)

        setTemporal({
            ...temporal,
            [e.target.name]: e.target.value
        })
        console.log(`______AQUI_TROLE 6___________\n ${temporal.image},${temporal.name}, ${temporal.heightMin}, ${temporal.heightMax}, ${temporal.weightMin},${temporal.weightMax},${temporal.life_spanMin}, ${temporal.life_spanMax}`)

        setErrors(validate({
            ...temporal,
            [e.target.name]: e.target.value
        }));
        
    };


    function handleSelect(e) {
        console.log(`______AQUI_TROLE 8___________\n ${input.image}, ${input.height}, ${input.weight}, ${input.life_span}`)

        setTemporal({
            ...temporal,
            temperament: [...temporal.temperament, e.target.value]
        })
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log(`______AQUI_TROLE 2___________\n ${input.image}, ${input.height}, ${input.weight}, ${input.life_span}`)
        concat()
        console.log(`______AQUI_TROLE 4___________\n ${input.image}, ${input.height}, ${input.weight}, ${input.life_span}`)

        dispatch(postDog(input))
        alert("Dog creado con exito!!")
        setTemporal({
            name: "",
            heightMin: 0,
            heightMax: 0,
            weightMin: 0,
            weightMax: 0,
            life_spanMin: 0,
            life_spanMax: 0,
            image: "",
            temperament: [],
        })
        // history.push("/home")
    };

    function handleDelete(el) {
        setTemporal({
            ...temporal,
            temperament: temporal.temperament.filter(tem => tem !== el)
        })
    };

    useEffect(() => {
        dispatch(getTemperament2())
    }, [dispatch]);

    return (
        <div >

            <NavLink to="/Home"><button>Volver</button></NavLink>
            <h1>Crear perro</h1>
            <div className="form">
                <form onSubmit={(e) => handleSubmit(e)} className="form">
                    
                    <div>
                        <label className="titulo">Altura minima:  </label>
                        <input className="input" type="number" placeholder="Ingrese Altura... " value={temporal.heightMin} name="heightMin" onChange={(e) => handleChange(e)} />
                        {errors.heightMin && (<p className="error">{errors.heightMin}</p>)}
                    </div>
                    <div>
                        <label className="titulo">Altura maxima:  </label>
                        <input className="input" type="number" placeholder="Ingrese Altura... " value={temporal.heightMax} name="heightMax" onChange={(e) => handleChange(e)} />
                        {errors.heightMax && (<p className="error">{errors.heightMax}</p>)}
                    </div>
                    <div>
                        <label className="titulo">Peso minimo:  </label>
                        <input className="input" type="number" placeholder="Ingrese Peso... " value={temporal.weightMin} name="weightMin" onChange={(e) => handleChange(e)} />
                        {errors.weightMin && (<p className="error">{errors.weightMin}</p>)}
                    </div>
                    <div>
                        <label className="titulo">Peso maximo:  </label>
                        <input className="input" type="number" placeholder="Ingrese Peso... " value={temporal.weightMax} name="weightMax" onChange={(e) => handleChange(e)} />
                        {errors.weightMax && (<p className="error">{errors.weightMax}</p>)}
                    </div>
                    <div>
                        <label className="titulo">Esperanza de vida Minima:  </label>
                        <input className="input" type="number" placeholder="Ingrese Esperanza de vida... " value={temporal.life_spanMin} name="life_spanMin" onChange={(e) => handleChange(e)} />
                        {errors.life_spanMin && (<p className="error">{errors.life_spanMin}</p>)}
                    </div>
                    <div>
                        <label className="titulo">Esperanza de vida Maxima:  </label>
                        <input className="input" type="number" placeholder="Ingrese Esperanza de vida... " value={temporal.life_spanMax} name="life_spanMax" onChange={(e) => handleChange(e)} />
                        {errors.life_spanMax && (<p className="error">{errors.life_spanMax}</p>)}
                    </div>
                    <div>
                        <label className="titulo">Nombre Raza:  </label>
                        <input className="input" type="text" placeholder="Ingrese Nombre de Raza... " value={temporal.name} name="name" onChange={(e) => handleChange(e)} />
                        {errors.name && (<p className="error">{errors.name}</p>)}
                    </div>
                    <div>
                        <label className="titulo">Imagen:  </label>
                        <input className="input" placeholder="Ingrese URL... " type="text" value={temporal.image} name="image" onChange={(e) => handleChange(e)} />
                    </div>
                    <label className="titulo">Temperamento: </label>
                    <select className="input" onChange={(e) => handleSelect(e)}>
                        {perros.map((dg) => (
                            <option value={dg.name}>{dg.name}</option>
                        ))}
                    </select>
                    <ul><li >{temporal.temperament.map(el => el + " ;")}</li></ul>
                    <button className="btn" type="submit" disabled={errors.button}>Crear Perro</button>

                </form>
            </div>
            {temporal.temperament.map(el =>
                <div className="divTemp">
                    <p>{el}</p>
                    <button className="eliminar" onClick={() => handleDelete(el)}>Quitar</button>
                </div>
            )}
        </div>
    )

};

