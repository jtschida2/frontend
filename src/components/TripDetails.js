const TripDetails = ({trip}) =>{
    return(
        <div className="backpack-details">
            <h4>Trip: {trip.destination}</h4>
            <p><strong>Size: </strong>{trip.size}</p>
            <p><strong>Backpack: </strong>{trip.backpack}</p>
            <p>{trip.createdAt}</p>
        </div>
    )
}

export default TripDetails