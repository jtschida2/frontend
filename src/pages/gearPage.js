import GearForm from '../components/GearForm'
import GearDetails from '../components/GearDetails'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import { useGearContext } from '../hooks/useGearContext'

const GearPage = () =>{
    const {gears, dispatch} = useGearContext()
    
    useEffect(() =>{
        const fetchGears = async () => {
        const response = await fetch('/catalog/gears')
        const json = await response.json()

        if (response.ok){
            dispatch({type:'SET_GEARS', payload: json})
        }
        }
        fetchGears()
    }, [])

    return(
        <div>
        <div>
            <Navbar></Navbar>
        </div>
        <div class="wrapper">
        <div className="gears">
                {gears && gears.map((gear) => (
                    <GearDetails key={gear._id} gear={gear}/>
                ))}
            </div>
            <GearForm />
        </div>
        </div>
    )
}

export default GearPage;