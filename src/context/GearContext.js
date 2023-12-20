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
        
            case 'UPDATE_GEAR':
                return {
                    ...state,
                    gears: state.gears.map((gear) => {
                        if (gear._id === action.payload._id) {
                            return {
                                ...gear,
                                // Update only the specific fields that have changed
                                gear_name: action.payload.gear_name,
                                gear_brand: action.payload.gear_brand,
                            };
                        }
                        return gear;
                    }),
                };
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