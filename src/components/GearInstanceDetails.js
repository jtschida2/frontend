const GearInstanceDetails = ({gearInstance}) =>{
    return(
        <div className="backpack-details">
            <h4>{gearInstance.gear.name}</h4>
            <p><strong>Serial Number: </strong>{gearInstance.serialNum}</p>
            <p><strong>Status: </strong>{gearInstance.status}</p>
        </div>
    )
}

export default GearInstanceDetails