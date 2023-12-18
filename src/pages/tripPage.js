import {useEffect, useState} from 'react'

import TripDetails from '../components/TripDetails'

import Navbar from '../components/Navbar'

const tripPage = () =>{
    const[trips, setTrips] = useState(null)

    useEffect(() =>{
        const fetchTrips = async () => {
        const response = await fetch('/catalog/trips')
        const json = await response.json()

        if (response.ok){
            setTrips(json)
        }
        }
        fetchTrips()
    }, [])

    return(
        <div>
        <div>
            <Navbar></Navbar>
        </div>
        <div class="wrapper">
            <div className="trips">
                {trips && trips.map((trip) => (
                    <TripDetails key={trip._id} trip={trip}/>
                ))}
            </div>
        </div>
    </div>
    )
}

export default tripPage