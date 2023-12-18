const BackpackDetails = ({backpack}) =>{
    return(
        <div className="backpack-details">
            <h4>Backpack Number: {backpack.backpackNumber}</h4>
            <p><strong>Type: </strong>{backpack.backpack_trip_type}</p>
            <p><strong>Current Gear: </strong>{backpack.backpackGear}</p>
            <p>{backpack.createdAt}</p>
        </div>
    )
}

export default BackpackDetails