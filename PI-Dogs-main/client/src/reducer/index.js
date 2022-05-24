
const initialState = {
    razas: [],
    temperament: [],
    todosLosDogs: [],
    dogs: [],
    detail: []
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_RAZAS":
            return {
                ...state,
                razas: action.payload,
                todosLosDogs: action.payload
            }
        case "GET_TEMPERAMENT":
            return {
                ...state,
                temperament: action.payload
            }
        case "FILTER_BY_STATUS":
            const allRazas = state.todosLosDogs
            const statusFiltered = action.payload === "termperament" ? allRazas : allRazas.filter(el => new String(el.temperament).includes(action.payload))

            return {
                ...state,
                razas: statusFiltered
            }
        case "FILTER_CREATED":
            const allRazas2 = state.todosLosDogs
              //const createdFilter = action.payload === "created" ? allRazas2
              const createdFilter = action.payload === "created" ? allRazas2.filter(el => el.createdInDb) : allRazas2.includes(el => !el.createdInDb)
              //const string = json.data.map((e) => e.name).join(", ")
      
            return {
                ...state,
                razas: action.payload
            }
            case "FILTER_CREATED_API":
                // const allRazas2 = state.todosLosDogs
                //   //const createdFilter = action.payload === "created" ? allRazas2
                //  const createdFilterApi = action.payload === "created" ? allRazas2.filter(el => el.createdInDb) : allRazas2.includes(el => !el.createdInDb)
                return {
                    ...state,
                    razas: action.payload
                }
            case "ORDER_BY_NAME":
                let sortedArr = action.payload === "asc" ?
                state.razas.sort(function (a,b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.razas.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                     return 0;
                })
                return {
                    ...state,
                    razas: sortedArr
                }
                case "GET_NAME_DOGS":
                    return {
                        ...state,
                        razas: action.payload
                    }
                    case "POST_DOG":
                        return state;
                    
                      case "GET_TEMPERAMENTS_2":
                          return {
                              ...state,
                                dogs: action.payload
                          }
                          case "GET_DETAILS":
                              return {
                                  ...state,
                                  detail: action.payload
                              }
                              case "CLEAN_DETAIL":
                                  return{
                                      ...state,
                                detail: []
                                  }

        default:
            return state;
    }
};

