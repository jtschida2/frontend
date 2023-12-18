import { useGearContext } from "../hooks/useGearContext"
const GearDetails = ({gear}) =>{

    const {dispatch} = useGearContext()

    const handleClick = async () => {
        const response = await fetch('/catalog/gears/' + gear._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_GEAR', payload: json})
        }
    }
    return(
        <div className="backpack-details">
            <h4>{gear.gear_name}</h4>
            <p><strong>Manufacturer: </strong>{gear.gear_brand}</p>
            <span onClick={handleClick}>Delete</span>
        </div>
    )
}

export default GearDetails