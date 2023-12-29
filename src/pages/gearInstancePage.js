import {useEffect, useState} from 'react'

import GearForm from '../components/GearForm'
import GearInstanceDetails from '../components/GearInstanceDetails'
import Navbar from '../components/Navbar'

const GearInstancePage = () =>{
    const[gearInstances, setGearInstances] = useState(null)
    
    useEffect(() =>{
        const fetchGearInstances = async () => {
        const response = await fetch('/catalog/gearinstances')
        const json = await response.json()

        if (response.ok){
            setGearInstances(json)
        }
        }
        fetchGearInstances()
    }, [])

    return(
        <div>
        <div>
            <Navbar></Navbar>
        </div>
        <div class="wrapper">
        <div className="gears">
                {gearInstances && gearInstances.map((gearInstance) => (
                    <GearInstanceDetails key={gearInstance._id} gearInstance={gearInstance}/>
                ))}
            </div>
        </div>
        </div>
    )
}

export default GearInstancePage;