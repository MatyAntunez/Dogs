import axios from "axios";

export function getRazas () {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/dogs");
        return dispatch({
            type: "GET_RAZAS",
            payload: json.data
        })
    }
};


export function filterCreated () {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/dogsdb");
        return dispatch({
            type: "FILTER_CREATED",
            payload: json.data
        })
    }
};

export function filterCreatedApi () {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/dogsapi");
        return dispatch({
            type: "FILTER_CREATED_API",
            payload: json.data
        })
    }
};

export function getTemperament () {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/temperament");
        return dispatch({
            type: "GET_TEMPERAMENT",
            payload: json.data
        })
    }
};

export function filterTemperamentByStatus (payload) {
    console.log(payload)
    return {
        type: "FILTER_BY_STATUS",
        payload
    }
}; 

export function orderByName (payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    } 
};

export function getNameDog (name) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/dogs?name=" + name);
            console.log(json)
            return dispatch ({
                type: "GET_NAME_DOGS",
                payload: json.data
            })
        } catch(error) {
            console.log("ME HICE VERGA MEN " + error)
        }
    }
};

export function getTemperament2 () {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/temperament");
        return dispatch({
            type: "GET_TEMPERAMENTS_2",
            payload: json.data
        })
    }
};


export function postDog (payload){
    return async function (dispatch) {
        console.log(`______AQUI_TROLE___________\n ${payload.image}, ${payload.height}, ${payload.weight}, ${payload.life_span}`)
        const json = await axios.post("http://localhost:3001/dog", payload)
        return dispatch({
            type: "POST_DOG",
            payload: json.data
        })
    }
};

export function getDetail (id){
    console.log(id)
     return async function (dispatch) {
         try {
             var json = await axios.get(`http://localhost:3001/dog/${id}`);
             return dispatch({
                 type: "GET_DETAILS",
                 payload: json.data
             })
         } catch (error) {
             console.log(error)
         }
     } 
};

export function cleanDetail(){
    return async function (dispatch) {
        try {
            return dispatch({
                type: "CLEAN_DETAIL",
                payload: []
            })
        } catch (error) {
            console.log(error)
        }
    }

};



