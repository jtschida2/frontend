import {useState} from "react"
import { useGearContext } from "../hooks/useGearContext"

const GearForm = () => {
    const { dispatch } = useGearContext()

    const[gear_name, setgear_name] = useState('')
    const[gear_brand, setgear_brand] = useState('')
    const[error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const gear = {gear_name, gear_brand}

        const response = await fetch('/catalog/gears', {
            method: 'POST',
            body: JSON.stringify(gear),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            setgear_name('')
            setgear_brand('')
            setError(null)
            setEmptyFields([])
            console.log("New gear added!")
            dispatch({type:'CREATE_GEAR', payload: json})
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Gear</h3>

            <label>Gear Name</label>
            <input 
                type="text"
                onChange={(e) => setgear_name(e.target.value)}
                value={gear_name}
                className={emptyFields.includes('gear_name') ? 'error': ''}
            />
           
           <label>Gear Brand</label>
            <input 
                type="text"
                onChange={(e) => setgear_brand(e.target.value)}
                value={gear_brand}
                className={emptyFields.includes('gear_brand') ? 'error': ''}
            />
        <button>Add Gear</button>
        {error && <div className="error">{error}</div>}
        </form>
    )
}

export default GearForm