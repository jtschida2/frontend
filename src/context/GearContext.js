import {createContext, useReducer} from 'react'

export const GearContext = createContext()

export const gearReducer = (state, action) => {
    switch (action.type){
        case 'SET_GEARS':
            return{
                gears: action.payload
            }

        case 'CREATE_GEAR':
            return{
                gears: [action.payload, ...state.gears]
            }
        
        case 'DELETE_GEAR':
            return{
                gears: state.gears.filter((g) => g._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const GearContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gearReducer, {
        gears: null
    })


    return (
        <GearContext.Provider value={{...state, dispatch}}>
            { children }
        </GearContext.Provider>
    )
}