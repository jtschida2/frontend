import { useState } from 'react';
import { useGearContext } from "../hooks/useGearContext";

const GearDetails = ({ gear }) => {
    const { dispatch } = useGearContext();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [updatedGear, setUpdatedGear] = useState({
        gear_name: gear.gear_name,
        gear_brand: gear.gear_brand,
    });

    const handleClick = async () => {
        // Check references before deletion
        try {
            const response = await fetch(`/catalog/gears/${gear._id}/checkReferences`);
            const json = await response.json();

            if (response.ok) {
                if (json.referenced) {
                    // Handle case where references exist
                    alert('There are gear instances referencing this item. Deletion is not allowed.');
                } else {
                    // No references found, proceed with deletion
                    const deleteResponse = await fetch(`/catalog/gears/${gear._id}`, {
                        method: 'DELETE'
                    });
                    const deleteJson = await deleteResponse.json();

                    if (deleteResponse.ok) {
                        dispatch({ type: 'DELETE_GEAR', payload: deleteJson });
                    }
                }
            } else {
                // Handle unsuccessful response
                console.error('Error checking references:', json.error);
            }
        } catch (error) {
            console.error('Error checking references:', error);
        }
    }

    const handleUpdateClick = () => {
        setShowUpdateForm(true);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        // Perform the update only if the gear details have changed
        if (
            updatedGear.gear_name !== gear.gear_name ||
            updatedGear.gear_brand !== gear.gear_brand
        ) {
            // Make an API call to update the gear details
            try {
                const response = await fetch('/catalog/gears/' + gear._id, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedGear),
                });
    
                if (response.ok) {
                    // If the update was successful, update the context
                    const updatedGearData = await response.json();
                    dispatch({ type: 'UPDATE_GEAR', payload: updatedGearData });
                } else {
                    console.log("WHOOPS")
                }
            } catch (error) {
                // Handle fetch errors or display error messages
            }
        }
    
        // Reset the form and hide it after submission
        setUpdatedGear({
            gear_name: gear.gear_name,
            gear_brand: gear.gear_brand,
        });
        setShowUpdateForm(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedGear((prevGear) => ({
            ...prevGear,
            [name]: value,
        }));
    };

    return (
        <div className="backpack-details">
        {!showUpdateForm && (
            <>
                <h4>{gear.gear_name}</h4>
                <p>
                    <strong>Manufacturer: </strong>
                    {gear.gear_brand}
                </p>
                <span className="spanUpdate"> <button className="button" onClick={handleUpdateClick}>Update</button></span>
                <span className="spanDelete"> <button className="button" onClick={handleClick}>Delete</button></span>
            </>
        )}
            {showUpdateForm ? (
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Gear Name:
                        <input
                            type="text"
                            name="gear_name"
                            value={updatedGear.gear_name}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Manufacturer:
                        <input
                            type="text"
                            name="gear_brand"
                            value={updatedGear.gear_brand}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Update Gear</button>
                </form>
            ) : null}
        </div>
    );
};

export default GearDetails;
