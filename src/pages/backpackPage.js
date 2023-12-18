import {useEffect, useState} from 'react'

import BackpackDetails from '../components/BackpackDetails'
import Navbar from '../components/Navbar'
import BackpackForm from '../components/BackpackForm'

const backpackPage = () =>{
    const[backpacks, setBackpacks] = useState(null)

    useEffect(() =>{
        const fetchBackpacks = async () => {
        const response = await fetch('/catalog/backpacks')
        const json = await response.json()

        if (response.ok){
            setBackpacks(json)
        }
        }
        fetchBackpacks()
    }, [])

    return(        
    <div>
        <div>
            <Navbar></Navbar>
        </div>
        <div class="wrapper">
            <div className="backpacks">
                {backpacks && backpacks.map((backpack) => (
                    <BackpackDetails key={backpack._id} backpack={backpack}/>
                ))}
            </div>
            <BackpackForm />
        </div>
    </div>
    )
}

export default backpackPage