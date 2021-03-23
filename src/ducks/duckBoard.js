import API from '../store/config'

const initialState = {
    title: API.title,
    columns: API.columns
};

export const addColumn = (title) =>{
    const col = {
        title: title,
        id: performance.now(),
        order: performance.now(),
        tasks: []
    }
    return{
        type: 'add_column',
        payload: col
    }
}

export const reducerBoard = (state =initialState, action) => {
    switch(action.type){
        case 'add_column': 
            state.columns=[...state.columns, action.payload]
            return {...state}
        default: return state
    }
}