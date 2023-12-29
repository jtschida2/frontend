const GearInstanceDetails = ({gearInstance}) =>{
    return(
        <div className="backpack-details">
            <h4>{gearInstance.gear.gear_name} #{gearInstance.serialNum}</h4>
            <p><strong>Brand: </strong>{gearInstance.gear.gear_brand}</p>
            <p><strong>Status: </strong>{gearInstance.status}</p>
        </div>
    )
}

export default GearInstanceDetails